import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common'
import { Request } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
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
}
