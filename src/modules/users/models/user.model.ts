import { Model } from 'objection'

export enum UserRoles {
  User = 'USER',
  Author = 'AUTHOR',
  Admin = 'ADMIN'
}

export default class User extends Model {
  id!: number
  name!: string
  surname!: string
  picture?: string
  type?: UserRoles[]

  static tableName = 'users'
}
