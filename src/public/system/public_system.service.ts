import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { PrismaService } from 'services/prisma.service'
import { removeMarkUrl } from 'helper/string'
import * as moment from 'moment'

@Injectable()
export class PublicSystemService {
  constructor(private readonly prisma: PrismaService) {}

  async checkVoucher(req: Request) {
    try {
      const { code } = req.params
      const voucher = await this.prisma.voucher.findUnique({
        where: {
          code,
        },
      })

      if (!voucher) {
        throw new HttpException('Voucher này không tồn tại', HttpStatus.OK)
      }

      const now = moment()

      if (now.isBefore(moment(voucher.activeAt))) {
        throw new HttpException(
          `Voucher này có hiệu lực vào ${moment(voucher.activeAt).format(
            'hh:mm DD/MM/YYYY',
          )}`,
          HttpStatus.OK,
        )
      }

      if (now.isAfter(moment(voucher.dueAt))) {
        throw new HttpException(
          `Voucher này đã hết hạn lúc ${moment(voucher.activeAt).format(
            'hh:mm DD/MM/YYYY',
          )}`,
          HttpStatus.OK,
        )
      }

      if (voucher.usageCount <= 0) {
        throw new HttpException(
          `Voucher này đã hết lượt sử dụng`,
          HttpStatus.OK,
        )
      }

      return {
        success: true,
        message: 'OK',
        data: voucher,
      }
    } catch (error) {
      console.log('🚀 ~ PublicSystemService ~ checkVoucher ~ error:', error)
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
