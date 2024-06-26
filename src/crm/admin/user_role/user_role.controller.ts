import { Controller, Post, Body, Get, Req, Put, Delete } from '@nestjs/common'
import { UserRoleService } from './user_role.service'
import { CreateUserRoleDto, UpdateUserRoleDto } from './user_role.dto'
import { Request } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('/api/v1/admin/role-user')
@ApiTags('User Role')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  @Post()
  @ApiOperation({ summary: 'Create ROLE' })
  async create(@Body() createDto: CreateUserRoleDto) {
    return this.service.create(createDto)
  }

  @Put()
  @ApiOperation({ summary: 'UPDATE ROLE' })
  async update(@Body() updateDto: UpdateUserRoleDto) {
    return this.service.update(updateDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'GET DETAIL BY ID' })
  async get(@Req() req: Request) {
    return this.service.get(req)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETE BY ID' })
  async hardDelete(@Req() req: Request) {
    return this.service.hardDelete(req)
  }

  @Get()
  @ApiOperation({ summary: 'SEARCH' })
  async search(@Req() req: Request) {
    return this.service.search(req)
  }
}
