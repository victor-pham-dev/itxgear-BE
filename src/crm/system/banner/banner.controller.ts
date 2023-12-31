import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common'
import { BannerSerivce } from './banner.service'
import { CreateBannerDto, UpdateBannerDto } from './banner.dto'
import { Request } from 'express'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('/api/v1/admin/banner')
@ApiTags('Banner')
export class BannerController {
  constructor(private readonly service: BannerSerivce) {}

  @Post()
  @ApiOperation({ summary: 'Create ' })
  async create(@Body() createDto: CreateBannerDto) {
    return this.service.create(createDto)
  }

  @Put()
  @ApiOperation({ summary: 'UPDATE ' })
  async update(@Body() updateDto: UpdateBannerDto) {
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

  //
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
    description: 'Tên sản phẩm',
    required: false,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {},
  })

  //
  async search(@Req() req: Request) {
    return this.service.search(req)
  }
}
