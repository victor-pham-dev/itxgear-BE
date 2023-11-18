import { ApiProperty } from '@nestjs/swagger'
import { WarehouseLogReason } from '@prisma/client'

export class CreateDto {
  @ApiProperty()
  readonly warehouseItemId: number

  @ApiProperty()
  readonly reason: WarehouseLogReason

  @ApiProperty()
  readonly quantity: number

  @ApiProperty()
  readonly price: number

  @ApiProperty()
  readonly note: string

  @ApiProperty()
  readonly platformOrderId?: string
}

export class UpdateDto extends CreateDto {
  @ApiProperty()
  readonly id: number

  @ApiProperty()
  readonly active: boolean
}
