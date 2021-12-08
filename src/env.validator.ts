import { cleanEnv, str } from 'envalid'

export const env = cleanEnv(process.env, {
  DB_CONNECTION_STRING: str()
})
