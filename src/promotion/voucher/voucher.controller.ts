import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common'
import { VoucherService } from './voucher.service'
import { CreateDto, UpdateDto } from './voucher.dto'
import { Request } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('/api/v1/admin/promotion/voucher')
@ApiTags('Promotion Voucher')
export class VoucherController {
  constructor(private readonly service: VoucherService) {}

  @Post()
  @ApiOperation({ summary: 'Create ' })
  async create(@Body() createDto: CreateDto) {
    return this.service.create(createDto)
  }

  @Put()
  @ApiOperation({ summary: 'UPDATE ' })
  async update(@Body() updateDto: UpdateDto) {
    return this.service.update(updateDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'GET DETAIL BY ID' })
  async get(@Req() req: Request) {
    return this.service.get(req)
  }

  @Get()
  @ApiOperation({ summary: 'SEARCH' })
  async search(@Req() req: Request) {
    return this.service.search(req)
  }
}
