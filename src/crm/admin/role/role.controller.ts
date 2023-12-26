import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto, UpdateRoleDto } from './role.dto'
import { Request } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('/api/v1/admin/role')
@ApiTags('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'Create ROLE' })
  async create(@Body() createDto: CreateRoleDto) {
    return this.roleService.create(createDto)
  }

  @Put()
  @ApiOperation({ summary: 'UPDATE ROLE' })
  async update(@Body() updateDto: UpdateRoleDto) {
    return this.roleService.update(updateDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'GET DETAIL BY ID' })
  async get(@Req() req: Request) {
    return this.roleService.get(req)
  }

  @Get()
  @ApiOperation({ summary: 'SEARCH' })
  async search(@Req() req: Request) {
    return this.roleService.search(req)
  }
}
