import { Logger as TSLogger } from 'tslog'
import { container, injectable } from 'tsyringe'

export const loggerToken = Symbol('app logger')
@injectable()
export class Logger extends TSLogger {}

const loggerConfig = {
  name: 'node-challenge-app'
}

container.register(loggerToken, { useValue: new Logger(loggerConfig) })
