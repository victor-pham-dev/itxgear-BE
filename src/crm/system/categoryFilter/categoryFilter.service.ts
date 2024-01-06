import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import {
  CreateCategoryFilterDto,
  UpdateCategoryFilterDto,
} from './categoryFilter.dto'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'

@Injectable()
export class CategoryFilterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateCategoryFilterDto) {
    const { filters, ...data } = createDto
    try {
      const result = await this.prisma.categoryFilters.create({
        data: { ...data, filters: filters as any[] },
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

  async update(updateDto: UpdateCategoryFilterDto) {
    const { id, filters, ...data } = updateDto

    try {
      await this.prisma.categoryFilters.update({
        where: { id: id },
        data: { ...data, filters: filters as any[] },
      })

      return {
        message: 'Update thành công',
        success: true,
        data: true,
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
      const result = await this.prisma.categoryFilters.findUnique({
        where: { id: Number(id), deleted: false },
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
    const { name = '', page = 1, pageSize = 10 } = req.query

    try {
      const dataTable = await this.prisma.categoryFilters.findMany({
        where: {
          name: {
            contains: name?.toString()?.toLowerCase() ?? '',
            mode: 'insensitive',
          },
          deleted: false,
        },
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
      })

      const totalCount = await this.prisma.categoryFilters.count({
        where: {
          name: {
            contains: name?.toString()?.toLowerCase() ?? '',
            mode: 'insensitive',
          },
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

  async delete(req: Request) {
    const { id } = req.params
    try {
      await this.prisma.categoryFilters.update({
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
}
