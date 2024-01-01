import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty } from 'class-validator'

export class UpdateUserStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly id: number

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly active: boolean
}
