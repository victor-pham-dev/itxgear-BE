import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'

@Injectable()
export class PublicDuckyService {
  constructor(private readonly prisma: PrismaService) {}

  async getLands() {
    try {
      const result = await this.prisma.land.findMany()

      return {
        message: 'OK',
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

  async getLandLog(req: Request) {
    try {
      const { id } = req.params
      const result = await this.prisma.landImageLog.findMany({
        where: {
          landId: Number(id),
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return {
        message: 'OK',
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

  async getLastestResult(req: Request) {
    try {
      const { id } = req.params
      const result = await this.prisma.resultPharse.findFirst({
        where: {
          landId: Number(id),
        },
        include: {
          receivers: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return {
        message: 'OK',
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
}
