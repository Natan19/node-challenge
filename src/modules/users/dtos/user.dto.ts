import { IsEnum, IsNotEmpty, IsString, IsUrl, Validate } from 'class-validator'
import { UserRoles } from '../models/user.model'

export class UserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  surname: string

  @IsUrl()
  picture: string

  @IsEnum(UserRoles, { each: true })
  type?: UserRoles[]
}
