import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class CreateWhiteListDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string
}
