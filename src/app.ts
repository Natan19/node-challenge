require('dotenv').config()
import 'reflect-metadata'
import express from 'express'
import helmet from 'helmet'
import {} from './modules/authentication/auth.module'
import { RoutesBootstrapper } from './builder'
import { Router } from 'express'
import bodyParser from 'body-parser'
import { appDescriptor } from './app.module'
import { dbConnect } from './db'
import { Logger, loggerToken } from './shared/utils/logger/logger'
import { container } from 'tsyringe'

dbConnect()

const app = express()
app.use(helmet())
app.use(bodyParser.json())

// Register all the routes.
const logger = container.resolve<Logger>(loggerToken)
const routesBootstrapper = new RoutesBootstrapper(appDescriptor, Router(), logger)
const router = routesBootstrapper.buildApplication()

app.use(router)
app.listen(3000)
