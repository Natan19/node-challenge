import { Class } from '../../../builder'

export function ValidateBody(dto: Class<any>) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {}
}
