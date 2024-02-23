import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common'
import { PublicDuckyService } from './ducky.service'

@Controller('/api/v1/public/ducky')
export class PublicDuckyController {
  constructor(private readonly service: PublicDuckyService) {}

  @Get('/land')
  async create() {
    return this.service.getLands()
  }
  @Get('/log/:id')
  async createlog(@Req() req: any) {
    return this.service.getLandLog(req)
  }
  @Get('/result/:id')
  async createResult(@Req() req: any) {
    return this.service.getLastestResult(req)
  }
}
