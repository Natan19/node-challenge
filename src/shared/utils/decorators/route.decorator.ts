export enum ROUTE_TYPES {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE'
}

export function Route(type: keyof typeof ROUTE_TYPES, path: string): Function {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value['routeType'] = ROUTE_TYPES[type].toLowerCase()
    descriptor.value['routePath'] = path
  }
}
