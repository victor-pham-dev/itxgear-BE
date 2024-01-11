import { Controller, Post, Body, Get, Req, Put, Delete } from '@nestjs/common'
import { CategoryFilterService } from './categoryFilter.service'
import {
  CreateCategoryFilterDto,
  UpdateCategoryFilterDto,
} from './categoryFilter.dto'
import { Request } from 'express'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

@Controller('/api/v1/system/category-filter')
@ApiTags('Category-Filter')
export class CategoryFilterController {
  constructor(private readonly service: CategoryFilterService) {}

  @Post()
  @ApiOperation({ summary: 'Create ' })
  async create(@Body() createDto: CreateCategoryFilterDto) {
    return this.service.create(createDto)
  }

  @Put()
  @ApiOperation({ summary: 'UPDATE ' })
  async update(@Body() updateDto: UpdateCategoryFilterDto) {
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
  @ApiQuery({
    name: 'name',
    description: 'Tên bộ lọc',
    required: false,
    type: String,
  })
  async search(@Req() req: Request) {
    return this.service.search(req)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Category filter BY ID' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
  })
  async delete(@Req() req: Request) {
    return this.service.delete(req)
  }
}
