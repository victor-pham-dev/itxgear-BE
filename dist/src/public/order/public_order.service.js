"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicOrderService = void 0;
const common_1 = require("@nestjs/common");
const moment_1 = require("moment");
const prisma_service_1 = require("../../../services/prisma.service");
let PublicOrderService = class PublicOrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const { receiver, payment, items, note } = createDto;
        try {
            let itemsPrice = 0;
            let hasPaid = 0;
            let productNameSoldOut = [];
            const mapCheckQuantity = await Promise.all(items.map(async (item) => {
                const { quantity, productId } = item;
                const warehouseItem = await this.prisma.wareHouse.findUnique({
                    where: {
                        productId,
                    },
                    select: {
                        Product: true,
                        quantity: true,
                    },
                });
                if (warehouseItem?.quantity && warehouseItem?.quantity >= quantity) {
                    return true;
                }
                else {
                    productNameSoldOut.push(warehouseItem?.Product?.name ?? '');
                }
                return false;
            }));
            if (!mapCheckQuantity.every((item) => Boolean(item))) {
                throw new common_1.HttpException(`${productNameSoldOut.toString()} đã hết hàng`, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            const customerInfo = await this.prisma.orderCustomerInfo.create({
                data: receiver,
            });
            let discountAmount = 0;
            let voucherId = undefined;
            if (payment.voucher?.trim().length > 0) {
                const voucherDetail = await this.prisma.voucher.findUnique({
                    where: {
                        code: payment.voucher,
                    },
                });
                if (voucherDetail) {
                    if (voucherDetail?.usageCount <= 0) {
                        throw new common_1.HttpException(`Voucher ${payment.voucher} đã hết lượt sử dụng `, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                    const now = (0, moment_1.default)();
                    if (now.isBefore(voucherDetail?.activeAt)) {
                        throw new common_1.HttpException(`Voucher ${payment.voucher} có hiệu lực vào lúc ${(0, moment_1.default)(voucherDetail.activeAt).format('HH:mm DD/mm/YYYY')}  ^ ^`, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                    if (now.isAfter(voucherDetail?.dueAt)) {
                        throw new common_1.HttpException(`Voucher ${payment.voucher} đã hết hiệu lực rồi quý khách!`, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                }
                voucherId = voucherDetail?.id;
                discountAmount = voucherDetail?.discount ?? 0;
            }
            const newOrder = await this.prisma.order.create({
                data: {
                    note,
                    voucherId: voucherId,
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
            });
            return {
                message: 'Tạo thành công',
                success: true,
                data: true,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PublicOrderService = PublicOrderService;
exports.PublicOrderService = PublicOrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicOrderService);
//# sourceMappingURL=public_order.service.js.map