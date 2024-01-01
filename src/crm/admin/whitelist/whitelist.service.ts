import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateWhiteListDto } from './whitelist.dto'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'
import { TeleBOT } from 'services/telegramBot'

@Injectable()
export class WhiteListService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateWhiteListDto) {
    try {
      const existedEmail = await this.prisma.user.findFirst({
        where: {
          email: createDto.email,
        },
      })
      if (existedEmail) {
        throw new HttpException(
          'Email này đã được người dùng đăng ký rồi',
          HttpStatus.CONFLICT,
        )
      }

      const existed = await this.prisma.emailUserWhiteList.findFirst({
        where: {
          email: createDto.email,
        },
      })

      if (existed) {
        throw new HttpException('Email này đã tồn tại', HttpStatus.OK)
      }

      const result = await this.prisma.emailUserWhiteList.create({
        data: createDto,
      })
      return {
        message: 'Tạo thành công',
        success: true,
        data: result,
      }
    } catch (error: any) {
      TeleBOT.sendText(`Create whitelist error ${error?.message}`)

      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
  async delete(req: Request) {
    const { id } = req.params
    try {
      await this.prisma.emailUserWhiteList.update({
        where: { id: Number(id) },
        data: { deleted: true },
      })
      return {
        message: 'Xoá thành công',
        success: true,
        data: null,
      }
    } catch (error: any) {
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async search(req: Request) {
    const { page = 1, pageSize = 10, email = '' } = req.query
    const lowercaseEmail = email?.toString()?.toLowerCase() ?? ''

    try {
      const dataTable = await this.prisma.emailUserWhiteList.findMany({
        where: {
          email: { contains: lowercaseEmail },
          deleted: false,
        },
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
      })

      const totalCount = await this.prisma.emailUserWhiteList.count({
        where: {
          email: { contains: lowercaseEmail },
          deleted: false,
        },
      })

      return {
        message: 'Thành công',
        success: true,
        data: {
          dataTable,
          paging: {
            page: Number(page),
            pageSize: Number(pageSize),
          },
          totalCount,
        },
      }
    } catch (error: any) {
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
