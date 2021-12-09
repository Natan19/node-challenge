export const controllerConfigKey = Symbol('controller-config')

export function Controller(constructor: Function) {
  Reflect.defineMetadata(controllerConfigKey, true, constructor)
}
