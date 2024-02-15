import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common'
import { PublicProductService } from './public_product.service'
import { Request } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('/api/v1/public/product')
@ApiTags('Public / Product')
export class PublicProductController {
  constructor(private readonly service: PublicProductService) {}

  @Get(':alias')
  @ApiOperation({ summary: 'GET DETAIL BY ID' })
  async get(@Req() req: Request) {
    return this.service.get(req)
  }

  @Get()
  @ApiOperation({ summary: 'SEARCH' })
  async search(@Req() req: Request) {
    return this.service.search(req)
  }

  @Get('/homepage/out-standing')
  @ApiOperation({ summary: '5 Sản phẩm nổi bật' })
  async getOutStandingExams() {
    return this.service.getOutStandingExams()
  }
}
