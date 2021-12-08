import { AppController } from './app.controller'
import { AppDescriptor } from './builder'
import { authModuleDescriptor } from './modules/authentication/auth.module'

export const appDescriptor: AppDescriptor = {
  modules: [authModuleDescriptor],
  controllers: [AppController]
}
