import { ApiProperty } from '@nestjs/swagger'

export class CreateVoucherDto {
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

export class UpdateVoucherDto extends CreateVoucherDto {
  @ApiProperty()
  readonly id: number

  @ApiProperty()
  readonly active: boolean
}
