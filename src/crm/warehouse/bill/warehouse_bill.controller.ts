import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common'
import { WarehouseBillService } from './warehouse_bill.service'
import { CreateBillDto } from './warehouse_bill.dto'
import { Request } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { WareHouseBill } from '@prisma/client'

@Controller('/api/v1/warehouse/bill')
@ApiTags('Warehouse Bill')
export class WarehouseBillController {
  constructor(private readonly service: WarehouseBillService) {}

  @Post()
  @ApiOperation({ summary: 'Create ' })
  async create(@Body() createDto: CreateBillDto) {
    return this.service.create(createDto)
  }

  @Put()
  @ApiOperation({ summary: 'UPDATE ' })
  async update(@Body() updateDto: Partial<WareHouseBill>) {
    return this.service.update(updateDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'GET DETAIL BY ID' })
  async get(@Req() req: Request) {
    return this.service.get(req)
  }

  @Get()
  @ApiOperation({ summary: 'SEARCH' })
  async search(@Req() req: Request) {
    return this.service.search(req)
  }
}
