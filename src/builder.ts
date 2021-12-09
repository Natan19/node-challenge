import { Router } from 'express'
import { Logger } from 'tslog'
import { container } from 'tsyringe'
import { controllerConfigKey } from './shared/utils/decorators/controller.decorator'
import { RouteConfig, routeConfigKey } from './shared/utils/decorators/route.decorator'

export type ModuleDescriptor = {
  controllers: Class<any>[]
}

export type AppDescriptor = {
  modules: ModuleDescriptor[]
}

export interface Class<T> extends Function {
  new (...args: any[]): T
}

const RESERVED_METHODS_NAMES = ['constructor', 'isController']
export class RoutesBootstrapper {
  private app: AppDescriptor
  private router: Router
  private logger: Logger

  constructor(appDescriptor: AppDescriptor, router: Router, logger: Logger) {
    this.app = appDescriptor
    this.router = router
    this.logger = logger
  }

  buildApplication(): Router {
    this.app.modules.forEach(this.buildRoutes)
    return this.router
  }

  private buildRoutes = (module: ModuleDescriptor) => {
    module.controllers.forEach(controller =>
      this.instantiateClassesAndRegisterRouters(controller)
    )
  }

  private instantiateClassesAndRegisterRouters(controller: Class<any>) {
    const controllerInstance = container.resolve<typeof controller>(controller)
    if (!Reflect.hasMetadata(controllerConfigKey, controller))
      throw new Error('Tried to instantiate methods from a non-controller')

    const methodNames = this.getControllerMethodsNames(controllerInstance)
    methodNames.forEach(methodName => this.registerRoutes(controllerInstance, methodName))
  }

  private getControllerMethodsNames(controller: Class<any>): string[] {
    const methodsNames = Object.getOwnPropertyNames(Object.getPrototypeOf(controller))
    return this.removeReservedMethodsNames(methodsNames)
  }

  private removeReservedMethodsNames(methodsNames: string[]): string[] {
    return methodsNames.filter(name => !RESERVED_METHODS_NAMES.includes(name))
  }

  private registerRoutes(controller: Class<any>, methodName: string): void {
    const routeConfig: RouteConfig =
      Reflect.getOwnMetadata(routeConfigKey, controller[methodName]) || {}
    this.router[routeConfig.verb.toLowerCase()](
      routeConfig.path,
      controller[methodName].bind(controller)
    )
    this.logger.info(`Route ${controller.name}.${methodName} registered.`)
  }
}
