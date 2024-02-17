import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'
import { removeMarkUrl } from 'helper/string'

@Injectable()
export class PublicCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getSubcategories(parentId: number, getFilter: boolean) {
    const subcategories = await this.prisma.category.findMany({
      where: { parentId: parentId, deleted: false, active: true },
      include: {
        CategoryFilters: {
          select: {
            filters: getFilter,
          },
        },
      },
    })

    if (subcategories.length === 0) {
      return []
    }

    const organizedSubcategories = await Promise.all(
      subcategories.map(async (subcategory) => {
        const nestedSubcategories = await this.getSubcategories(
          subcategory.id,
          getFilter,
        )
        return {
          ...subcategory,
          children: nestedSubcategories,
        }
      }),
    )

    return organizedSubcategories
  }

  async getAllCategoryHomepage() {
    try {
      const rootList = await this.prisma.category.findMany({
        where: {
          deleted: false,
          parentId: 0,
          active: true,
        },
        include: {
          CategoryFilters: {
            select: {
              filters: true,
            },
          },
        },
      })

      const organizedSubcategories = await Promise.all(
        rootList.map(async (category) => {
          const nestedSubcategories = await this.getSubcategories(
            category.id,
            true,
          )
          return {
            ...category,
            children: nestedSubcategories,
          }
        }),
      )
      return {
        message: 'Thành công',
        success: true,
        data: organizedSubcategories,
      }
    } catch (error) {
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async getCategoryFilter(req: Request) {
    try {
      const { id } = req.params
      const result = await this.prisma.categoryFilters.findUnique({
        where: {
          id: Number(id),
        },
      })
      return {
        success: true,
        message: 'OK',
        data: result?.filters ?? [],
      }
    } catch (error) {
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
