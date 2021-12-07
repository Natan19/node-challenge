import { Router } from 'express'
import { Logger } from 'tslog'

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
export class Bootstrapper {
  private app: AppDescriptor
  private router: Router
  private logger: Logger

  constructor(appDescriptor: AppDescriptor, router: Router) {
    this.app = appDescriptor
    this.router = router
    this.logger = new Logger({ name: 'node-challenge' })
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
    const controllerInstance = new controller()
    if (!controllerInstance.isController)
      throw new Error('Tried to instantiate methods from a non-controller')

    const methodNames = this.getControllerMethodsNames(controllerInstance)
    methodNames.forEach(methodName => this.registerRoutes(controllerInstance[methodName]))
  }
  private getControllerMethodsNames(controller: Class<any>): string[] {
    const methodsNames = Object.getOwnPropertyNames(Object.getPrototypeOf(controller))
    return this.removeReservedMethodsNames(methodsNames)
  }

  private removeReservedMethodsNames(methodsNames: string[]): string[] {
    return methodsNames.filter(name => !RESERVED_METHODS_NAMES.includes(name))
  }
  private registerRoutes(classMethod: Function): void {
    this.router[classMethod['routeType']](classMethod['routePath'], classMethod)
    this.logger.info('REGISTERED ROUTE: ' + classMethod.name)
  }
}
