import { Controller, Post, Body, Get, Req, Put, Param } from '@nestjs/common'
import { Request } from 'express'
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { PublicCategoryService } from './public_category.service'

@Controller('/api/v1/public/category')
@ApiTags('Public / Category')
export class PublicCategoryController {
  constructor(private readonly service: PublicCategoryService) {}

  @Get('/homepage/all-with-children')
  @ApiOperation({ summary: 'Get All category with childrens' })
  async getOutStandingExams() {
    return this.service.getAllCategoryHomepage()
  }

  @Get('/category-filter/:id')
  @ApiOperation({ summary: 'Lấy bộ lọc theo id' })
  @ApiParam({ name: 'id', description: 'ID của bộ lọc', type: 'string' })
  async getCategoryFilter(@Req() req: Request) {
    return this.service.getCategoryFilter(req)
  }
}
