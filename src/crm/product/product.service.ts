import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateProductDto, UpdateProductDto } from './product.dto'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'
import { removeMarkUrl } from 'helper/string'

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCategoryIds(id: number): Promise<number[]> {
    let result: number[] = []

    const category = await this.prisma.category.findUnique({ where: { id } })

    if (category) {
      result.push(category.id)

      if (category.parentId !== null && category.parentId !== 0) {
        const parentCategoryIds = await this.findAllCategoryIds(
          category.parentId,
        )
        result = result.concat(parentCategoryIds)
      }
    }

    return result
  }

  async create(createDto: CreateProductDto) {
    const { id, images, overView, name, keywords, ...data } = createDto

    try {
      const categoryIds = await this.findAllCategoryIds(createDto.categoryId)
      const result = await this.prisma.product.create({
        data: {
          name,
          keywords,
          categoryIds,
          alias: removeMarkUrl(name),
          images: JSON.stringify(images),
          overView: JSON.stringify(overView),
          searchString: `${name} ${keywords} ${JSON.stringify(overView)}`,
          ...data,
        },
      })
      const warehouse = await this.prisma.wareHouse.create({
        data: { productId: result.id },
      })

      await this.prisma.product.update({
        where: { id: result.id },
        data: { wareHouseId: warehouse.id },
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

  async update(updateDto: UpdateProductDto) {
    const {
      id,
      name,

      images,
      overView,

      keywords,
      ...data
    } = updateDto

    try {
      const categoryIds = await this.findAllCategoryIds(updateDto.categoryId)

      await this.prisma.product.update({
        where: { id: Number(id) },
        data: {
          categoryIds,
          alias: removeMarkUrl(name),
          images: JSON.stringify(images),
          overView: JSON.stringify(overView),
          searchString: `${name.toLowerCase()} ${keywords.toLowerCase()} ${JSON.stringify(
            overView,
          ).toLowerCase()}`,
          ...data,
        },
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
      const result = await this.prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
          configInfo: true,
        },
      })
      return {
        message: 'Thành công',
        success: true,
        data: result,
      }
    } catch (error: any) {
      console.log(
        '🚀 ~ file: product.service.ts:160 ~ ProductService ~ get ~ error:',
        error,
      )
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
        },
        include: {
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
      console.log(
        '🚀 ~ file: product.service.ts:212 ~ ProductService ~ search ~ error:',
        error,
      )
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
