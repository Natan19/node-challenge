import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class UserLoginDto {
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string
}
