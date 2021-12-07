export function Controller(constructor: Function) {
  constructor.prototype['isController'] = true
}
