import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto'
import { Request } from 'express'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

@Controller('/api/v1/system/category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create ' })
  async create(@Body() createDto: CreateCategoryDto) {
    return this.service.create(createDto)
  }

  @Put()
  @ApiOperation({ summary: 'UPDATE ' })
  async update(@Body() updateDto: UpdateCategoryDto) {
    return this.service.update(updateDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'GET DETAIL BY ID' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
  })
  async get(@Req() req: Request) {
    return this.service.get(req)
  }

  @Get()
  @ApiOperation({ summary: 'SEARCH' })
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
  async search(@Req() req: Request) {
    return this.service.search(req)
  }
}