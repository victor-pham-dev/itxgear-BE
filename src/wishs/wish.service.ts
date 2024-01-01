import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateWishDto } from './wish.dto'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'
@Injectable()
export class WishService {
  constructor(private readonly prisma: PrismaService) {}

  //CREATE NEW USER
  async create(create: CreateWishDto) {
    try {
      const result = await this.prisma.wish.create({
        data: create,
      })

      return {
        message: 'Lời chúc của bạn đã được gửi ',
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

  async search(req: Request) {
    const { page = 1, pageSize = 10 } = req.query

    try {
      const dataTable = await this.prisma.wish.findMany({
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
      })

      const totalCount = await this.prisma.wish.count({})

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
