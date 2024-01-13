import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'
import { UpdateUserStatusDto } from './user.dto'
import { CacheService } from 'services/cache.service'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheManager: CacheService,
  ) {}

  async search(req: Request) {
    const { page = 1, pageSize = 10 } = req.query
    // const lowercaseLabel = label?.toString()?.toLowerCase() ?? ''

    try {
      const dataTable = await this.prisma.user.findMany({
        include: {
          ROLES: {
            include: {
              role: true,
            },
          },
        },
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
      })

      const totalCount = await this.prisma.user.count()

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

  async changeStatus(data: UpdateUserStatusDto) {
    const { active, id } = data

    try {
      if (!active) {
        await this.cacheManager.deleteAuthToken(id)
      }

      const result = await this.prisma.user.update({
        where: { id: Number(id) },
        data: { active },
      })

      return {
        message: 'Cập nhật thành công',
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
