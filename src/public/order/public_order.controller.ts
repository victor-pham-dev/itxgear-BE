import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common'
import { PublicOrderService } from './public_order.service'
import { CreateOrderDto } from './public_order.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('/api/v1/public/order')
@ApiTags('Public Order')
export class PublicOrderController {
  constructor(private readonly service: PublicOrderService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo đơn hàng ' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.service.create(createOrderDto)
  }
}
