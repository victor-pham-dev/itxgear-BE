import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateWishDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty()
  @IsNotEmpty()
  readonly content: string
}
