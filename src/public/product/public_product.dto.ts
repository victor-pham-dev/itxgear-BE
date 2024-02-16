import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class IncrementViewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly alias: string
}

export class GetDetailForCartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly ids: number[]
}
