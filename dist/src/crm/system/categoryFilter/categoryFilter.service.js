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
exports.CategoryFilterService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../services/prisma.service");
let CategoryFilterService = class CategoryFilterService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const { filters, ...data } = createDto;
        try {
            const result = await this.prisma.categoryFilters.create({
                data: { ...data, filters: filters },
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
        const { id, filters, ...data } = updateDto;
        try {
            await this.prisma.categoryFilters.update({
                where: { id: id },
                data: { ...data, filters: filters },
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
            const result = await this.prisma.categoryFilters.findUnique({
                where: { id: Number(id), deleted: false },
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
        const { name = '', page = 1, pageSize = 10 } = req.query;
        try {
            const dataTable = await this.prisma.categoryFilters.findMany({
                where: {
                    name: {
                        contains: name?.toString()?.toLowerCase() ?? '',
                        mode: 'insensitive',
                    },
                    deleted: false,
                },
                skip: (Number(page) - 1) * Number(pageSize),
                take: Number(pageSize),
            });
            const totalCount = await this.prisma.categoryFilters.count({
                where: {
                    name: {
                        contains: name?.toString()?.toLowerCase() ?? '',
                        mode: 'insensitive',
                    },
                    deleted: false,
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
    async delete(req) {
        const { id } = req.params;
        try {
            await this.prisma.categoryFilters.update({
                where: { id: Number(id) },
                data: { deleted: true },
            });
            return {
                message: 'Xoá thành công',
                success: true,
                data: null,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CategoryFilterService = CategoryFilterService;
exports.CategoryFilterService = CategoryFilterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryFilterService);
//# sourceMappingURL=categoryFilter.service.js.map