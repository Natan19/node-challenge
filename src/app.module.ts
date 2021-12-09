import { AppController } from './app.controller'
import { AppDescriptor, ModuleDescriptor } from './builder'
import { authModuleDescriptor } from './modules/authentication/auth.module'

export const rootModuleDescriptor: ModuleDescriptor = {
  controllers: [AppController]
}

export const appDescriptor: AppDescriptor = {
  modules: [authModuleDescriptor, rootModuleDescriptor]
}
