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
exports.PublicProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../services/prisma.service");
let PublicProductService = class PublicProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async get(req) {
        const { alias } = req.params;
        try {
            const result = await this.prisma.product.findUnique({
                where: { alias: String(alias) },
                include: {
                    configInfo: true,
                    category: true,
                },
            });
            return {
                message: 'Thành công',
                success: true,
                data: result,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async search(req) {
        const { search, page = 1, pageSize = 10 } = req.query;
        const lowercaseSearch = search?.toString()?.toLowerCase() ?? '';
        try {
            const dataTable = await this.prisma.product.findMany({
                where: {
                    searchString: {
                        contains: lowercaseSearch,
                        mode: 'insensitive',
                    },
                    active: true,
                },
                select: {
                    name: true,
                    images: true,
                    categoryId: true,
                    category: true,
                    price: true,
                    salePrice: true,
                    code: true,
                    WareHouse: true,
                },
                skip: (Number(page) - 1) * Number(pageSize),
                take: Number(pageSize),
            });
            const totalCount = await this.prisma.product.count({
                where: {
                    searchString: {
                        contains: lowercaseSearch,
                        mode: 'insensitive',
                    },
                },
            });
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
            };
        }
        catch (error) {
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getOutStandingExams() {
        try {
            const result = await this.prisma.product.findMany({
                where: {
                    active: true,
                    WareHouse: {
                        quantity: {
                            gt: 0,
                        },
                    },
                    status: 'STOCKING',
                },
                orderBy: {
                    view: 'desc',
                },
                select: {
                    name: true,
                    images: true,
                    categoryId: true,
                    category: true,
                    price: true,
                    salePrice: true,
                    code: true,
                    view: true,
                    status: true,
                },
                take: 5,
            });
            return {
                success: true,
                data: result,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PublicProductService = PublicProductService;
exports.PublicProductService = PublicProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicProductService);
//# sourceMappingURL=public_product.service.js.map