import { Class } from '../../../builder'

export type DataValidator = {
  dto: Class<any>
  propertyName: 'body' | 'header'
  propertyKey: number
}

export const dataValidatorKey = Symbol('data-validator')

export function ValidateBody(dto: Class<any>) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingDataValidators: DataValidator[] =
      Reflect.getOwnMetadata(dataValidatorKey, target, propertyKey) || []
    existingDataValidators.push({
      dto,
      propertyName: 'body',
      propertyKey: parameterIndex
    })
    Reflect.defineMetadata(dataValidatorKey, existingDataValidators, target, propertyKey)
  }
}
