import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  surname: string

  @IsUrl()
  @IsOptional()
  picture?: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string

  @IsEmail()
  email: string
}
