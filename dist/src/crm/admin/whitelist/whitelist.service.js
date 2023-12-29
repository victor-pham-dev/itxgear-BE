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
exports.WhiteListService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../services/prisma.service");
const telegramBot_1 = require("../../../../services/telegramBot");
let WhiteListService = class WhiteListService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        try {
            const result = await this.prisma.emailUserWhiteList.create({
                data: createDto,
            });
            return {
                message: 'Tạo thành công',
                success: true,
                data: result,
            };
        }
        catch (error) {
            telegramBot_1.TeleBOT.sendText(`Create whitelist error ${error?.message}`);
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(req) {
        const { id } = req.params;
        try {
            await this.prisma.emailUserWhiteList.delete({
                where: { id: Number(id) },
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
    async search(req) {
        const { page = 1, pageSize = 10, email = '' } = req.query;
        const lowercaseEmail = email?.toString()?.toLowerCase() ?? '';
        try {
            const dataTable = await this.prisma.emailUserWhiteList.findMany({
                where: {
                    email: { contains: lowercaseEmail },
                },
                skip: (Number(page) - 1) * Number(pageSize),
                take: Number(pageSize),
            });
            const totalCount = await this.prisma.emailUserWhiteList.count({
                where: {
                    email: { contains: lowercaseEmail },
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
exports.WhiteListService = WhiteListService;
exports.WhiteListService = WhiteListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WhiteListService);
//# sourceMappingURL=whitelist.service.js.map