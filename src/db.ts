import Knex from 'knex'
import { Model } from 'objection'
import { container } from 'tsyringe'
import knexConfig from '../knexfile'
import { Logger, loggerToken } from './shared/utils/logger/logger'

export async function dbConnect() {
  const logger: Logger = container.resolve(loggerToken)
  const knex = Knex(knexConfig.development)
  Model.knex(knex)

  knex
    .raw('SELECT 1')
    .then(() => {
      logger.info('Database succesfully connected.')
    })
    .catch(e => {
      logger.error('Error connecting to the database.')
      logger.error(e)
    })
}
