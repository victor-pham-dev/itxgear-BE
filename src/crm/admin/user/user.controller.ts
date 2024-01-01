import { Controller, Body, Get, Req, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { Request } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UpdateUserStatusDto } from './user.dto'

@Controller('/api/v1/admin/user')
@ApiTags('ADMIN / USER - (User management)')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @ApiOperation({ summary: 'SEARCH' })
  async search(@Req() req: Request) {
    return this.service.search(req)
  }

  @Patch('/active-status')
  @ApiOperation({ summary: 'Update active status' })
  async updateUserStatus(@Body() updateDto: UpdateUserStatusDto) {
    return this.service.changeStatus(updateDto)
  }
}
