import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common'
import { WarehouseItemService } from './warehouse_item.service'
import { Request } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('/api/v1/warehouse/item')
@ApiTags('Warehouse Item')
export class WarehouseItemController {
  constructor(private readonly service: WarehouseItemService) {}

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
