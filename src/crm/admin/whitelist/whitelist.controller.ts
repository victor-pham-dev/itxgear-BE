import { Controller, Post, Body, Get, Req, Put, Delete } from '@nestjs/common'
import { WhiteListService } from './whitelist.service'
import { CreateWhiteListDto } from './whitelist.dto'
import { Request } from 'express'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('/api/v1/admin/whitelist/email')
@ApiTags('Admin/ promote Email  for allow user register')
export class WhiteListController {
  constructor(private readonly service: WhiteListService) {}

  @Post()
  @ApiOperation({ summary: 'Create ' })
  async create(@Body() createDto: CreateWhiteListDto) {
    return this.service.create(createDto)
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
    name: 'email',
    description: 'Email',
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

  @Delete(':id')
  @ApiOperation({ summary: 'Delete BY ID' })
  async delete(@Req() req: Request) {
    return this.service.delete(req)
  }
}
