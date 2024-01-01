import { Controller, Post, Body, Get, Req } from '@nestjs/common'
import { WishService } from './wish.service'
import { CreateWishDto } from './wish.dto'
import { Request } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('/api/v1/wish')
@ApiTags(' :)) dont touch this ')
export class AuthController {
  constructor(private readonly wishService: WishService) {}

  @Post()
  @ApiOperation({ summary: 'Create Wish' })
  async create(@Body() createDto: CreateWishDto) {
    return this.wishService.create(createDto)
  }

  @Get()
  @ApiOperation({ summary: 'SEARCH' })
  async search(@Req() req: Request) {
    return this.wishService.search(req)
  }
}
