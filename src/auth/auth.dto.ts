import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string
}

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly email: string

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string
}
