import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateRoleDto, UpdateRoleDto } from './role.dto'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateRoleDto) {
    const { alias, label } = createDto

    try {
      const result = await this.prisma.role.create({
        data: {
          label,
          alias,
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

  async update(updateDto: UpdateRoleDto) {
    const { id, ...data } = updateDto

    try {
      const result = await this.prisma.role.update({
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
      console.log(
        '🚀 ~ file: role.service.ts:50 ~ RoleService ~ update ~ error:',
        error,
      )
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async get(req: Request) {
    const { id } = req.params

    try {
      const result = await this.prisma.role.findUnique({
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
    const { label, page = 1, pageSize = 10 } = req.query
    const lowercaseLabel = label?.toString()?.toLowerCase() ?? ''

    try {
      const dataTable = await this.prisma.role.findMany({
        where: {
          label: {
            contains: lowercaseLabel,
            mode: 'insensitive',
          },
        },
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
      })

      const totalCount = await this.prisma.role.count({
        where: {
          label: {
            contains: lowercaseLabel,
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
}
