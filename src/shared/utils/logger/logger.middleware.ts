import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { Logger, loggerToken } from './logger'

const logger = container.resolve<Logger>(loggerToken)
export const loggerMiddleware = function (req: Request, _res: Response, next: Function) {
  const date = new Date()
  logger.info(LOGGER_MIDDLEWARE_MESSAGE(date, req))
  next()
}

const LOGGER_MIDDLEWARE_MESSAGE = (date: Date, req: Request) =>
  `REQUEST RECEIVED at ${
    req.path
  } on ${date.toLocaleDateString()} - ${date.toLocaleTimeString()}, from ${req.ip}`
