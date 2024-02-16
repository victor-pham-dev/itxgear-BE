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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../services/prisma.service");
const string_1 = require("../../../helper/string");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllCategoryIds(id) {
        let result = [];
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (category) {
            result.push(category.id);
            if (category.parentId !== null && category.parentId !== 0) {
                const parentCategoryIds = await this.findAllCategoryIds(category.parentId);
                result = result.concat(parentCategoryIds);
            }
        }
        return result;
    }
    async create(createDto) {
        const { id, images, overView, name, keywords, ...data } = createDto;
        try {
            const categoryIds = await this.findAllCategoryIds(createDto.categoryId);
            const result = await this.prisma.product.create({
                data: {
                    name,
                    keywords,
                    categoryIds,
                    rootCategoryId: categoryIds[categoryIds.length - 1],
                    alias: (0, string_1.removeMarkUrl)(name),
                    images: JSON.stringify(images),
                    overView: JSON.stringify(overView),
                    searchString: `${name} ${keywords} ${JSON.stringify(overView)}`,
                    ...data,
                },
            });
            const warehouse = await this.prisma.wareHouse.create({
                data: { productId: result.id },
            });
            await this.prisma.product.update({
                where: { id: result.id },
                data: { wareHouseId: warehouse.id },
            });
            return {
                message: 'Tạo thành công',
                success: true,
                data: result,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(updateDto) {
        const { id, name, images, overView, keywords, ...data } = updateDto;
        try {
            const categoryIds = await this.findAllCategoryIds(updateDto.categoryId);
            await this.prisma.product.update({
                where: { id: Number(id) },
                data: {
                    categoryIds,
                    rootCategoryId: categoryIds[categoryIds.length - 1],
                    alias: (0, string_1.removeMarkUrl)(name),
                    images: JSON.stringify(images),
                    overView: JSON.stringify(overView),
                    searchString: `${name.toLowerCase()} ${keywords.toLowerCase()} ${JSON.stringify(overView).toLowerCase()}`,
                    ...data,
                },
            });
            return {
                message: 'Update thành công',
                success: true,
                data: true,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async get(req) {
        const { id } = req.params;
        try {
            const result = await this.prisma.product.findUnique({
                where: { id: Number(id) },
                include: {
                    configInfo: true,
                },
            });
            return {
                message: 'Thành công',
                success: true,
                data: result,
            };
        }
        catch (error) {
            console.log('🚀 ~ file: product.service.ts:160 ~ ProductService ~ get ~ error:', error);
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
                },
                include: {
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
            console.log('🚀 ~ file: product.service.ts:212 ~ ProductService ~ search ~ error:', error);
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map