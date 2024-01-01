import { Controller, Post, Body, Get, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto, LoginUserDto } from './auth.dto'
import { Request } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('/api/v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'User đăng ký' })
  async create(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto)
  }

  @Post('/login')
  @ApiOperation({ summary: 'User đăng Nhập' })
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto)
  }

  @Get('/me')
  @ApiOperation({ summary: 'User Lấy thông tin cá nhân' })
  async getProfileUser(@Req() req: Request) {
    return this.userService.getProfileUser(req)
  }

  @Post('/logout')
  @ApiOperation({ summary: 'User đăng xuất' })
  async logout(@Req() req: Request) {
    return this.userService.logout(req)
  }
}
