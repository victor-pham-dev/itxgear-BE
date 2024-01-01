import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'
import { removeMarkUrl } from 'helper/string'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateCategoryDto) {
    const { label, ...data } = createDto
    try {
      const result = await this.prisma.category.create({
        data: { label, alias: removeMarkUrl(label), ...data },
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

  async update(updateDto: UpdateCategoryDto) {
    const { id, ...data } = updateDto

    try {
      await this.prisma.category.update({
        where: { id: id },
        data,
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
      const [parent, children] = await Promise.all([
        this.prisma.category.findUnique({
          where: { id: Number(id) },
        }),
        this.prisma.category.findMany({
          where: {
            parentId: Number(id),
          },
        }),
      ])

      return {
        message: 'Thành công',
        success: true,
        data: { ...parent, children },
      }
    } catch (error: any) {
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async search(req: Request) {
    const { label = '', page = 1, pageSize = 10 } = req.query
    const lowercaseLabel = label?.toString()?.toLowerCase() ?? ''

    try {
      const dataTable = await this.prisma.category.findMany({
        where: {
          label: {
            contains: lowercaseLabel,
            mode: 'insensitive',
          },
          parentId: 0,
        },
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
      })

      const totalCount = await this.prisma.category.count({
        where: {
          label: {
            contains: lowercaseLabel,
            mode: 'insensitive',
          },
          parentId: 0,
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