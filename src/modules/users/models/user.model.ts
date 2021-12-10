const Password = require('objection-password')()
import { Model } from 'objection'

export enum UserRoles {
  User = 'USER',
  Author = 'AUTHOR',
  Admin = 'ADMIN'
}

export default class UserModel extends Password(Model) {
  id!: number
  firstName!: string
  surname!: string
  picture?: string
  roles!: UserRoles[]
  password!: string
  email!: string

  static tableName = 'User'

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'surname', 'password', 'roles', 'email'],
      properties: {
        id: { type: 'number' },
        firstName: { type: 'string', minLength: 1, maxLength: 60 },
        surname: { type: 'string', minLength: 1, maxLength: 60 },
        password: { type: 'string', minLength: 1 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        roles: { enum: Object.values(UserRoles) }
      }
    }
  }
}
