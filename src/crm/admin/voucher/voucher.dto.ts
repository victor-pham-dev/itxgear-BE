import { ApiProperty } from '@nestjs/swagger'

export class CreateDto {
  @ApiProperty()
  readonly description: string

  @ApiProperty()
  readonly dueAt: Date

  @ApiProperty()
  readonly code: string

  @ApiProperty()
  readonly usageCount: number

  @ApiProperty()
  readonly activeAt: Date

  @ApiProperty()
  readonly priceMin: number

  @ApiProperty()
  readonly discount: number
}

export class UpdateDto extends CreateDto {
  @ApiProperty()
  readonly id: number

  @ApiProperty()
  readonly active: boolean
}
