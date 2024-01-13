import { Controller, Post, Body, Get, Req, Put, Patch } from '@nestjs/common'
import { CategoryService } from './category.service'
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  UpdateFilterForCategoryDto,
} from './category.dto'
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

  @Get('/category-detail/:id')
  @ApiOperation({ summary: 'GET DETAIL & LIST CHILDREN CATEGORY BY ID' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
  })
  async getCategoryDetail(@Req() req: Request) {
    return this.service.getCategoryDetail(req)
  }

  @Patch('/filter')
  @ApiOperation({ summary: 'UPDATE Filters for Category' })
  async updateFilter(@Body() updateFilterDto: UpdateFilterForCategoryDto) {
    return this.service.updateFilters(updateFilterDto)
  }

  @Get('/product/all-with-children')
  @ApiOperation({ summary: 'GET ALL CATEGORY WITH CHILDREN' })
  async getAllWithChildren() {
    return this.service.getAllCategoryWithChildren()
  }
}
