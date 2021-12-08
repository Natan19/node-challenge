const { env } = require('./src/env.validator')

module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: env.DB_CONNECTION_STRING
  }
}
