import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateDto, UpdateDto } from './voucher.dto'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'

@Injectable()
export class VoucherService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateDto) {
    try {
      const result = await this.prisma.voucher.create({
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

  async update(updateDto: UpdateDto) {
    const { id, ...data } = updateDto

    try {
      const result = await this.prisma.voucher.update({
        where: {
          id: Number(id),
        },
        data,
      })

      return {
        message: 'Update thành công',
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

  async get(req: Request) {
    const { id } = req.query

    try {
      const result = await this.prisma.voucher.findUnique({
        where: { id: Number(id) },
      })
      return {
        message: 'Thành công',
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
    // const lowercaseLabel = label?.toString()?.toLowerCase() ?? ''

    try {
      const dataTable = await this.prisma.voucher.findMany({
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
      })

      const totalCount = await this.prisma.voucher.count({})

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