import { plainToClass, TargetMap } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { getTrailingCommentRanges } from 'typescript'
import { AuthController } from '../../../modules/authentication/controllers/auth.controller'
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

export type FormattedError = {
  [type: string]: { [type: string]: string } | undefined
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
      descriptor.value = async function () {
        const validationErrors = await dataValidation(validators, arguments)
        if (validationErrors.length > 0) return arguments[1]['send'](validationErrors)
        originalFunction.apply(this, arguments)
      }
    }

    Reflect.defineMetadata(routeConfigKey, routeConfig, descriptor.value)
  }
}

async function dataValidation(
  validators: DataValidator[],
  originalArguments: IArguments
): Promise<FormattedError[]> {
  let errors: FormattedError[] = []
  for await (const validator of validators) {
    const { dto, propertyKey, propertyName } = validator

    const objectToValidate = plainToClass(
      dto,
      originalArguments[propertyKey][propertyName]
    )

    const unformatedErrors = await validate(objectToValidate, {
      forbidNonWhitelisted: true,
      enableDebugMessages: true
    })

    errors = validationErrorFormatter(unformatedErrors)
  }

  return errors
}

function validationErrorFormatter(errors: ValidationError[]): FormattedError[] {
  return errors.map(prepareString)
}

function prepareString(error: ValidationError): FormattedError {
  return { [error.property]: error.constraints }
}
