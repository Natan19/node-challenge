import 'reflect-metadata'
import { application, Express } from 'express'
import express from 'express'
import helmet from 'helmet'
import { authModuleDescriptor } from './modules/auth/auth.module'
import { AppDescriptor, Bootstrapper } from './builder'
import { Router } from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(helmet())
app.use(bodyParser.json())

const appDescriptor: AppDescriptor = {
  modules: [authModuleDescriptor]
}

const bootstrapper = new Bootstrapper(appDescriptor, Router())
const router = bootstrapper.buildApplication()
app.use(router)
app.listen(3000)
