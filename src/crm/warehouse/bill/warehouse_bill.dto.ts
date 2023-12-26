import { ApiProperty } from '@nestjs/swagger'
import { WarehouseLogReason } from '@prisma/client'

export class CreateBillDto {
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

export class UpdateBillDto extends CreateBillDto {
  @ApiProperty()
  readonly id: number

  @ApiProperty()
  readonly active: boolean
}
