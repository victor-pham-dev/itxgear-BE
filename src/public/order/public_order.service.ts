import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateDto } from './public_order.dto'
import moment from 'moment'
import { PrismaService } from 'services/prisma.service'

@Injectable()
export class PublicOrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateDto) {
    const { receiver, payment, items, note } = createDto
    try {
      let itemsPrice = 0
      let hasPaid = 0
      // for check quantity in warehouse
      let productNameSoldOut: string[] = []
      const mapCheckQuantity = await Promise.all(
        items.map(async (item) => {
          const { quantity, productId } = item
          const warehouseItem = await this.prisma.wareHouse.findUnique({
            where: {
              productId,
            },
            select: {
              Product: true,
              quantity: true,
            },
          })
          // itemsPrice += quantity * (warehouseItem?.Product?.salePrice ?? 0)
          if (warehouseItem?.quantity && warehouseItem?.quantity >= quantity) {
            return true
          } else {
            productNameSoldOut.push(warehouseItem?.Product?.name ?? '')
          }
          return false
        }),
      )

      if (!mapCheckQuantity.every((item) => Boolean(item))) {
        throw new HttpException(
          `${productNameSoldOut.toString()} đã hết hàng`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        )
      }

      // check quantity DONE

      const customerInfo = await this.prisma.orderCustomerInfo.create({
        data: receiver,
      })

      // check voucher
      let discountAmount = 0
      let voucherId: never | number = undefined

      if (payment.voucher?.trim().length > 0) {
        const voucherDetail = await this.prisma.voucher.findUnique({
          where: {
            code: payment.voucher,
          },
        })
        if (voucherDetail) {
          if (voucherDetail?.usageCount <= 0) {
            throw new HttpException(
              `Voucher ${payment.voucher} đã hết lượt sử dụng `,
              HttpStatus.UNPROCESSABLE_ENTITY,
            )
          }

          const now = moment()
          if (now.isBefore(voucherDetail?.activeAt)) {
            throw new HttpException(
              `Voucher ${payment.voucher} có hiệu lực vào lúc ${moment(
                voucherDetail.activeAt,
              ).format('HH:mm DD/mm/YYYY')}  ^ ^`,
              HttpStatus.UNPROCESSABLE_ENTITY,
            )
          }
          if (now.isAfter(voucherDetail?.dueAt)) {
            throw new HttpException(
              `Voucher ${payment.voucher} đã hết hiệu lực rồi quý khách!`,
              HttpStatus.UNPROCESSABLE_ENTITY,
            )
          }
        }
        voucherId = voucherDetail?.id
        discountAmount = voucherDetail?.discount ?? 0
      }
      // check voucher ok

      const newOrder = await this.prisma.order.create({
        data: {
          note,
          voucherId: voucherId as never,
          customerInfo: {
            create: receiver,
          },
          payment: {
            create: {
              itemsPrice,
              hasPaid: itemsPrice - discountAmount,
              discountAmount,
              ...payment,
            },
          },
          items: {
            create: items.map((item) => item),
          },
        },
      })

      return {
        message: 'Tạo thành công',
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
}
