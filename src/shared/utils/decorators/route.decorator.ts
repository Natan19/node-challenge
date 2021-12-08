import { validate } from 'class-validator'
import { DataValidator, dataValidatorKey } from './validate-body.decorator'

export enum ROUTE_TYPES {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE'
}

export type RouteConfig = {
  verb: ROUTE_TYPES
  path: string
}

export const routeConfigKey = Symbol('route-config')

export function Route(type: keyof typeof ROUTE_TYPES, path: string): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const routeConfig: RouteConfig = { verb: ROUTE_TYPES[type], path }

    const originalFunction = descriptor.value
    if (Reflect.hasMetadata(dataValidatorKey, target, propertyKey)) {
      const validators: DataValidator[] = Reflect.getOwnMetadata(
        dataValidatorKey,
        target,
        propertyKey
      )
      descriptor.value = function () {
        validators.forEach(async (validator: DataValidator) => {
          const { dto, propertyKey, propertyName } = validator
          const objectToValidate = new dto()
          Object.assign(objectToValidate, arguments[propertyKey][propertyName])
          await validate(objectToValidate, {
            forbidNonWhitelisted: true,
            enableDebugMessages: true
          })
        })
        originalFunction(...arguments)
      }
    }

    Reflect.defineMetadata(routeConfigKey, routeConfig, descriptor.value)
  }
}
