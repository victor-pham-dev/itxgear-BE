import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateBillDto, UpdateBillDto } from './warehouse_bill.dto'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'
import { WareHouseBill } from '@prisma/client'

@Injectable()
export class WarehouseBillService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateBillDto) {
    try {
      const result = await this.prisma.wareHouseBill.create({
        data: createDto,
      })

      await this.prisma.wareHouse.update({
        where: {
          id: result.warehouseItemId,
        },
        data: {
          quantity: { increment: createDto.quantity },
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

  async update(updateDto: Partial<WareHouseBill>) {
    const { id, ...data } = updateDto

    try {
      const result = await this.prisma.wareHouseBill.update({
        where: { id: id },
        data: { ...data, updatedAt: new Date() },
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
    const { id } = req.params

    try {
      const result = await this.prisma.wareHouseBill.findUnique({
        where: { id: Number(id) },
        include: { WarehouseItem: true },
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
    const { warehouseItemId, page = 1, pageSize = 10 } = req.query
    // const lowercaseLabel = label?.toString()?.toLowerCase() ?? ''

    try {
      const dataTable = await this.prisma.wareHouseBill.findMany({
        where: {
          warehouseItemId: Number(warehouseItemId),
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
