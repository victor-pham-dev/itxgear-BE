import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'

@Injectable()
export class PublicProductService {
  constructor(private readonly prisma: PrismaService) {}

  async get(req: Request) {
    const { alias } = req.params

    try {
      const result = await this.prisma.product.findUnique({
        where: { alias: String(alias) },
        include: {
          configInfo: true,
          category: true,
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
    const { search, page = 1, pageSize = 10 } = req.query
    const lowercaseSearch = search?.toString()?.toLowerCase() ?? ''

    try {
      const dataTable = await this.prisma.product.findMany({
        where: {
          searchString: {
            contains: lowercaseSearch,
            mode: 'insensitive',
          },
          active: true,
        },

        select: {
          name: true,
          images: true,
          categoryId: true,
          category: true,
          price: true,
          salePrice: true,
          code: true,
          WareHouse: true,
        },
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
      })

      const totalCount = await this.prisma.product.count({
        where: {
          searchString: {
            contains: lowercaseSearch,
            mode: 'insensitive',
          },
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

  async getOutStandingExams() {
    try {
      const result = await this.prisma.product.findMany({
        where: {
          active: true,
          WareHouse: {
            quantity: {
              gt: 0,
            },
          },
          status: 'STOCKING',
        },
        orderBy: {
          view: 'desc',
        },

        select: {
          name: true,
          images: true,
          categoryId: true,
          category: true,
          price: true,
          salePrice: true,
          code: true,
          view: true,
          status: true,
        },
        take: 5,
      })

      return {
        success: true,
        data: result,
      }
    } catch (error) {
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
