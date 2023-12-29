import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'

@Injectable()
export class WarehouseItemService {
  constructor(private readonly prisma: PrismaService) {}

  async get(req: Request) {
    const { id } = req.params

    try {
      const result = await this.prisma.wareHouse.findUnique({
        where: { id: Number(id) },
        include: {
          Product: true,
        },
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
      const dataTable = await this.prisma.wareHouse.findMany({
        include: {
          Product: true,
          WareHouseBill: {
            select: {
              warehouseItemId: true,
              createdAt: true,
              id: true,
              note: true,
              Order: true,
              orderId: true,
              platformOrderId: true,
              quantity: true,
              reason: true,
              updatedAt: true,
              WarehouseItem: true,
            },
            orderBy: {
              updatedAt: 'desc',
            },
            take: 1,
          },
        },
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
