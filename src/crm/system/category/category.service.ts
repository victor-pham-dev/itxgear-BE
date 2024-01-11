import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  UpdateCategoryFilter,
} from './category.dto'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'
import { removeMarkUrl } from 'helper/string'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getSubcategories(parentId: number) {
    const subcategories = await this.prisma.category.findMany({
      where: { parentId: parentId, deleted: false },
    })

    if (subcategories.length === 0) {
      return []
    }

    const organizedSubcategories = await Promise.all(
      subcategories.map(async (subcategory) => {
        const nestedSubcategories = await this.getSubcategories(subcategory.id)
        return {
          ...subcategory,
          children: nestedSubcategories,
        }
      }),
    )

    return organizedSubcategories
  }

  async create(createDto: CreateCategoryDto) {
    const { id, label, ...data } = createDto
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
        data: { ...data, alias: removeMarkUrl(data.label) },
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
      const [result] = await Promise.all([
        this.prisma.category.findUnique({
          where: { id: Number(id), deleted: false },
        }),
      ])

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
    const { label = '', page = 1, pageSize = 10 } = req.query
    const lowercaseLabel = label?.toString()?.toLowerCase() ?? ''

    try {
      const dataTable = await this.prisma.category.findMany({
        where: {
          label: {
            contains: lowercaseLabel,
            mode: 'insensitive',
          },
          deleted: false,
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
          deleted: false,
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

  async getCategoryDetail(req: Request) {
    const { id } = req.params
    try {
      const root = await this.prisma.category.findUnique({
        where: { id: Number(id) },
      })

      if (!root) {
        throw new HttpException(
          'Không tìm thấy danh mục này',
          HttpStatus.NOT_FOUND,
        )
      }

      const children = await this.getSubcategories(root.id)

      return {
        message: 'Thành công',
        success: true,
        data: {
          root,
          children,
        },
      }
    } catch (error) {
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async delete(req: Request) {
    const { id } = req.params
    try {
      await this.prisma.category.update({
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

  // async updateAllChildrenFilter(categoryId: number, categoryFilterId: number){
  //   const childrenCategory = await this.prisma.category.findMany({
  //     where: {
  //       id: categoryId
  //     }
  //   })

  //   await Promise.all(childrenCategory.map(item => {

  //   }))

  // }

  // async updateFilters(data: UpdateCategoryFilter){
  //   try {
  //     const {categoryId,categoryFilterId, applyForChildren = true} = data
  //     const result = await this.prisma.category.update({
  //       where: {
  //         id: categoryId
  //       },
  //       data: {
  //         categoryFiltersId: categoryFilterId
  //       }
  //     })

  //     if(applyForChildren){
  //       await
  //     }

  //   } catch (error) {

  //   }
  // }
}
