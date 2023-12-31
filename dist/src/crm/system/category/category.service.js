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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../services/prisma.service");
const string_1 = require("../../../../helper/string");
let CategoryService = class CategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const { label, ...data } = createDto;
        try {
            const result = await this.prisma.category.create({
                data: { label, alias: (0, string_1.removeMarkUrl)(label), ...data },
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
        const { id, ...data } = updateDto;
        try {
            await this.prisma.category.update({
                where: { id: id },
                data,
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
            const [parent, children] = await Promise.all([
                this.prisma.category.findUnique({
                    where: { id: Number(id) },
                }),
                this.prisma.category.findMany({
                    where: {
                        parentId: Number(id),
                    },
                }),
            ]);
            return {
                message: 'Thành công',
                success: true,
                data: { ...parent, children },
            };
        }
        catch (error) {
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async search(req) {
        const { label = '', page = 1, pageSize = 10 } = req.query;
        const lowercaseLabel = label?.toString()?.toLowerCase() ?? '';
        try {
            const dataTable = await this.prisma.category.findMany({
                where: {
                    label: {
                        contains: lowercaseLabel,
                        mode: 'insensitive',
                    },
                    parentId: 0,
                },
                skip: (Number(page) - 1) * Number(pageSize),
                take: Number(pageSize),
            });
            const totalCount = await this.prisma.category.count({
                where: {
                    label: {
                        contains: lowercaseLabel,
                        mode: 'insensitive',
                    },
                    parentId: 0,
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
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map