import { Controller, Post, Body, Get, Req, Put, Query } from '@nestjs/common'
import { PublicProductService } from './public_product.service'
import { Request } from 'express'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { GetDetailForCartDto, IncrementViewDto } from './public_product.dto'

@Controller('/api/v1/public/product')
@ApiTags('Public / Product')
export class PublicProductController {
  constructor(private readonly service: PublicProductService) {}

  @Get(':alias')
  @ApiOperation({ summary: 'Tìm kiếm sản phẩm theo alias' })
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

  @Put('/increment-view')
  @ApiOperation({ summary: 'Tăng lượt view cho sản phẩm' })
  async incrementView(@Body() data: IncrementViewDto) {
    return this.service.incrementView(data)
  }

  @Get('/detail/related')
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm liên quan' })
  @ApiQuery({
    name: 'rootCategoryId',
    description: 'id danh mục gốc',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'currentProductId',
    description: 'id sản phẩm hiện tại cần tìm danh sách liên quan',
    required: true,
    type: Number,
  })
  async getRelated(@Req() req: Request) {
    return this.service.getRelatedProducts(req)
  }

  @Post('/detail/cart-items')
  @ApiOperation({ summary: 'Lấy thông tin sản phẩm theo ids' })
  async getDetailForCart(@Body() getDetailDto: GetDetailForCartDto) {
    return this.service.getDetailForCart(getDetailDto)
  }
}
