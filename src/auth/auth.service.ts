import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto, LoginUserDto } from './auth.dto'
import * as bcrypt from 'bcrypt'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { PrismaService } from 'services/prisma.service'
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  //CREATE NEW USER
  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto

    try {
      const findExisted = await this.prisma.user.findFirst({
        where: {
          email: email.toLowerCase(),
        },
      })
      if (findExisted !== null) {
        throw new HttpException(
          'Email đã được sử dụng',
          HttpStatus.UNPROCESSABLE_ENTITY,
        )
      }

      const encryptedPassword = await bcrypt.hash(password, 10)

      const result = await this.prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          password: encryptedPassword,
        },
      })

      return {
        message: 'Đăng ký tài khoản mới thành công',
        success: true,
        data: result,
      }
    } catch (error: any) {
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
  //CREATE NEW USER DONE

  //USER LOGIN

  private signToken(payload: any): string {
    return this.jwtService.sign(payload)
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email.toLowerCase(),
        },
        include: {
          ROLES: {
            include: {
              role: true,
            },
          },
        },
      })
      if (!user) {
        throw new HttpException(
          'Tài khoản hoặc mật khẩu không chính xác',
          HttpStatus.UNPROCESSABLE_ENTITY,
        )
      }

      if (user && !user?.active) {
        throw new HttpException(
          'Tài khoản của bạn đang bị tắt quyền truy cập hệ thống',
          HttpStatus.UNAUTHORIZED,
        )
      }

      const comparePassword = await bcrypt.compare(password, user.password)
      if (!comparePassword) {
        throw new HttpException(
          'Tài khoản hoặc mật khẩu không chính xác',
          HttpStatus.UNPROCESSABLE_ENTITY,
        )
      }
      const roles = user.ROLES.map((item) => item.role.alias)

      const accessToken = this.signToken({
        email: email.toLowerCase(),
        id: user.id,
        roles,
      })

      return {
        message: 'Login thành công',
        success: true,
        data: { accessToken },
      }
    } catch (error: any) {
      console.log(
        '🚀 ~ file: auth.service.ts:106 ~ AuthService ~ loginUser ~ error:',
        error,
      )
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
  //USER LOGIN DONE

  //USER GET PROFILE
  async getProfileUser(req: Request) {
    const user = req['user'] as User
    console.log(
      '🚀 ~ file: auth.service.ts:117 ~ AuthService ~ getProfileUser ~ user:',
      user,
    )

    try {
      const result = await this.prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          name: true,
          email: true,
          ROLES: {
            include: {
              role: true,
            },
          },
        },
      })
      const rawRoles = await this.prisma.userRole.findMany({
        where: { userId: user.id },
        include: { role: true },
      })
      const roles = rawRoles.map((item) => item.role.alias)

      return {
        message: 'Thành công',
        success: true,
        data: { ...user, roles },
      }
    } catch (error: any) {
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
