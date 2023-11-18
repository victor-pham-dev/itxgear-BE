import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common'
import { PublicProductService } from './public_product.service'
import { Request } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('/api/v1/public/product')
@ApiTags('Product')
export class PublicProductController {
  constructor(private readonly service: PublicProductService) {}

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
