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
exports.UserRoleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../services/prisma.service");
const cache_service_1 = require("../../../../services/cache.service");
let UserRoleService = class UserRoleService {
    constructor(prisma, cacheService) {
        this.prisma = prisma;
        this.cacheService = cacheService;
    }
    async create(createDto) {
        try {
            const existed = await this.prisma.userRole.findFirst({
                where: {
                    ...createDto,
                },
            });
            if (existed) {
                throw new common_1.HttpException('User đã có quyền truy cập này rồi', common_1.HttpStatus.BAD_REQUEST);
            }
            const result = await this.prisma.userRole.create({
                data: createDto,
            });
            const role = await this.prisma.role.findUnique({
                where: {
                    id: createDto?.roleId,
                },
            });
            return {
                message: 'Tạo thành công',
                success: true,
                data: { ...result, role },
            };
        }
        catch (error) {
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(updateDto) {
        const { id, ...data } = updateDto;
        try {
            const result = await this.prisma.userRole.update({
                where: {
                    id: Number(id),
                },
                data,
            });
            return {
                message: 'Update thành công',
                success: true,
                data: result,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async get(req) {
        const { id } = req.params;
        try {
            const result = await this.prisma.userRole.findUnique({
                where: { id: Number(id) },
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
        const { page = 1, pageSize = 10 } = req.query;
        try {
            const dataTable = await this.prisma.userRole.findMany({
                include: {
                    user: true,
                    role: true,
                },
                skip: (Number(page) - 1) * Number(pageSize),
                take: Number(pageSize),
            });
            const totalCount = await this.prisma.userRole.count();
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
    async hardDelete(req) {
        const { id } = req.params;
        try {
            const result = await this.prisma.userRole.delete({
                where: { id: Number(id) },
            });
            await this.cacheService.deleteAuthToken(result.userId);
            return {
                message: 'Xoá Thành công',
                success: true,
                data: result,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserRoleService = UserRoleService;
exports.UserRoleService = UserRoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService])
], UserRoleService);
//# sourceMappingURL=user_role.service.js.map