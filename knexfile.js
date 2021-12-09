require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DB_CONNECTION_STRING,
    migrations: {
      tableName: 'migrations',
      directory: './src/migrations'
    }
  }
}
