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
    async getSubcategories(parentId) {
        const subcategories = await this.prisma.category.findMany({
            where: { parentId: parentId, deleted: false },
        });
        if (subcategories.length === 0) {
            return [];
        }
        const organizedSubcategories = await Promise.all(subcategories.map(async (subcategory) => {
            const nestedSubcategories = await this.getSubcategories(subcategory.id);
            return {
                ...subcategory,
                children: nestedSubcategories,
            };
        }));
        return organizedSubcategories;
    }
    async create(createDto) {
        const { id, label, ...data } = createDto;
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
                data: { ...data, alias: (0, string_1.removeMarkUrl)(data.label) },
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
            const [result] = await Promise.all([
                this.prisma.category.findUnique({
                    where: { id: Number(id), deleted: false },
                }),
            ]);
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
        const { label = '', page = 1, pageSize = 10 } = req.query;
        const lowercaseLabel = label?.toString()?.toLowerCase() ?? '';
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
            });
            const totalCount = await this.prisma.category.count({
                where: {
                    label: {
                        contains: lowercaseLabel,
                        mode: 'insensitive',
                    },
                    deleted: false,
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
    async getCategoryDetail(req) {
        const { id } = req.params;
        try {
            const root = await this.prisma.category.findUnique({
                where: { id: Number(id) },
            });
            if (!root) {
                throw new common_1.HttpException('Không tìm thấy danh mục này', common_1.HttpStatus.NOT_FOUND);
            }
            const children = await this.getSubcategories(root.id);
            return {
                message: 'Thành công',
                success: true,
                data: {
                    root,
                    children,
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
            await this.prisma.category.update({
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
    async updateAllChildrenFilter(categoryId, categoryFilterId) {
        const childrenCategory = await this.prisma.category.findMany({
            where: {
                id: categoryId,
            },
        });
        if (childrenCategory.length > 0) {
            await this.prisma.category.updateMany({
                where: {
                    parentId: categoryId,
                },
                data: {
                    categoryFiltersId: categoryFilterId,
                },
            });
            await Promise.all(childrenCategory.map((item) => {
                this.updateAllChildrenFilter(item.id, categoryFilterId);
            }));
            return true;
        }
        return false;
    }
    async updateFilters(updateFilterForCategory) {
        try {
            const { categoryId, categoryFilterId, applyForChildren = true, } = updateFilterForCategory;
            const result = await this.prisma.category.update({
                where: {
                    id: categoryId,
                },
                data: {
                    categoryFiltersId: categoryFilterId,
                },
            });
            if (applyForChildren) {
                await this.updateAllChildrenFilter(categoryId, categoryFilterId);
            }
            return {
                message: 'Cập nhật thành công',
                success: true,
                data: result,
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