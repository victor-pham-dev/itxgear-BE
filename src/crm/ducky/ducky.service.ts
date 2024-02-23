import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'

@Injectable()
export class DuckyService {
  constructor(private readonly prisma: PrismaService) {}

  async createLand(createDto: any) {
    try {
      const result = await this.prisma.land.create({
        data: createDto,
      })

      return {
        message: 'Tạo thành công',
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

  async createLog(data: any) {
    try {
      const result = await this.prisma.landImageLog.create({
        data,
      })

      return {
        message: 'Tạo thành công',
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

  async createResultPharse(data: any) {
    try {
      const receiversData = data?.receivers as any[]
      const { receivers, ...restData } = data

      const result = await this.prisma.resultPharse.create({
        data: {
          ...restData,
          receivers: receiversData,
        },
      })

      return {
        message: 'Tạo thành công',
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
