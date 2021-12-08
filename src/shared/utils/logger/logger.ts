import { Logger as TSLogger } from 'tslog'
import { container, injectable } from 'tsyringe'

@injectable()
export class Logger extends TSLogger {}
export const loggerToken = Symbol('app logger')

const loggerConfig = {
  name: 'node-challenge-app'
}
container.register(loggerToken, { useValue: new Logger(loggerConfig) })
