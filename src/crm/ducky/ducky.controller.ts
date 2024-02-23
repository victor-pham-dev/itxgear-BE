import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common'
import { DuckyService } from './ducky.service'

@Controller('/api/v1/ducky')
export class DuckyController {
  constructor(private readonly service: DuckyService) {}

  @Post('/create-land')
  async create(@Body() createDto: any) {
    return this.service.createLand(createDto)
  }
  @Post('/create-log')
  async createlog(@Body() createDto: any) {
    return this.service.createLand(createDto)
  }
  @Post('/create-result')
  async createResult(@Body() createDto: any) {
    return this.service.createLand(createDto)
  }
}
