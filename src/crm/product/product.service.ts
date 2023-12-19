import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateDto, UpdateDto } from './product.dto'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateDto) {
    const {
      name,
      categoryId,
      status,
      keywords,
      images,
      description,
      configInfo,
      seo,
      overView,
      price,
      salePrice,
    } = createDto

    try {
      const result = await this.prisma.product.create({
        data: {
          name,
          status,

          categoryId,
          seo,
          keywords,
          images: JSON.stringify(images),
          description,
          overView: JSON.stringify(overView),
          price,
          salePrice,
          configInfo: {
            create: configInfo.map((item) => item),
          },
          searchString: `${name} ${keywords} ${JSON.stringify(overView)}`,
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
      console.log(
        '🚀 ~ file: product.service.ts:59 ~ ProductService ~ create ~ error:',
        error,
      )
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async update(updateDto: UpdateDto) {
    const {
      id,
      name,

      images,
      configInfo,
      overView,

      keywords,
      ...data
    } = updateDto

    try {
      await this.prisma.product.update({
        where: { id: Number(id) },
        data: {
          images: JSON.stringify(images),
          overView: JSON.stringify(overView),
          searchString: `${name.toLowerCase()} ${keywords.toLowerCase()} ${JSON.stringify(
            overView,
          ).toLowerCase()}`,
          ...data,
        },
      })

      const currentConfig = await this.prisma.productConfigInfo.findMany({
        where: { productId: Number(id) },
      })

      const configIdsToRemove = currentConfig.filter(
        (item) => !configInfo?.find((current) => current.id === item.id),
      )
      await Promise.all(
        configIdsToRemove.map(
          async (id) =>
            await this.prisma.productConfigInfo.delete({
              where: {
                id: Number(id),
              },
            }),
        ),
      )
      await Promise.all(
        configInfo.map(async (item) => {
          const { label, value } = item
          if (item?.id) {
            await this.prisma.productConfigInfo.update({
              where: { id: item.id },
              data: { label, value },
            })
            return
          } else {
            await this.prisma.productConfigInfo.create({
              data: { label, value, productId: Number(id) },
            })
            return
          }
        }),
      )

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
    const { id } = req.query

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
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
