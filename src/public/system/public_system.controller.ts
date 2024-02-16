import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common'
import { Request } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { PublicSystemService } from './public_system.service'

@Controller('/api/v1/public/system')
@ApiTags('Public / System')
export class PublicSystemController {
  constructor(private readonly service: PublicSystemService) {}

  @Get('/voucher/:code')
  @ApiOperation({ summary: 'Lấy thông tin của mã giảm giá' })
  async getOutStandingExams(@Req() req: Request) {
    return this.service.checkVoucher(req)
  }
}
