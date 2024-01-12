import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto, UpdateProductDto } from './product.dto'
import { Request } from 'express'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

@Controller('/api/v1/product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create product' })
  async create(@Body() createDto: CreateProductDto) {
    return this.service.create(createDto)
  }

  @Put()
  @ApiOperation({ summary: 'UPDATE Product' })
  async update(@Body() updateDto: UpdateProductDto) {
    return this.service.update(updateDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'GET DETAIL BY ID' })
  @ApiQuery({
    name: 'id',
    description: 'Id sản phẩm',
    required: true,
    type: Number,
  })
  async get(@Req() req: Request) {
    return this.service.get(req)
  }

  @Get()
  @ApiQuery({
    name: 'page',
    description: 'Trang hiện tại',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    description: 'Số lượng data / 1 trang',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'name',
    description: 'Tên sản phẩm',
    required: false,
    type: String,
  })
  @ApiOperation({ summary: 'SEARCH' })
  async search(@Req() req: Request) {
    return this.service.search(req)
  }
}
