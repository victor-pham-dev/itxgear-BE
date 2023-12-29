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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../services/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const { name, email, password } = createUserDto;
        try {
            const findExisted = await this.prisma.user.findFirst({
                where: {
                    email: email.toLowerCase(),
                },
            });
            if (findExisted !== null) {
                throw new common_1.HttpException('Email đã được sử dụng', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            const encryptedPassword = await bcrypt.hash(password, 10);
            const result = await this.prisma.user.create({
                data: {
                    name,
                    email: email.toLowerCase(),
                    password: encryptedPassword,
                },
            });
            return {
                message: 'Đăng ký tài khoản mới thành công',
                success: true,
                data: result,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    signToken(payload) {
        return this.jwtService.sign(payload);
    }
    async loginUser(loginUserDto) {
        const { email, password } = loginUserDto;
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: email.toLowerCase(),
                },
                include: {
                    ROLES: {
                        include: {
                            role: true,
                        },
                    },
                },
            });
            if (!user) {
                throw new common_1.HttpException('Tài khoản hoặc mật khẩu không chính xác', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                throw new common_1.HttpException('Tài khoản hoặc mật khẩu không chính xác', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            const roles = user.ROLES.map((item) => item.role.alias);
            const accessToken = this.signToken({
                email: email.toLowerCase(),
                id: user.id,
                roles,
            });
            return {
                message: 'Login thành công',
                success: true,
                data: { accessToken },
            };
        }
        catch (error) {
            console.log('🚀 ~ file: auth.service.ts:106 ~ AuthService ~ loginUser ~ error:', error);
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getProfileUser(req) {
        const user = req['user'];
        console.log('🚀 ~ file: auth.service.ts:117 ~ AuthService ~ getProfileUser ~ user:', user);
        try {
            const result = await this.prisma.user.findUnique({
                where: { id: user.id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    ROLES: {
                        include: {
                            role: true,
                        },
                    },
                },
            });
            const rawRoles = await this.prisma.userRole.findMany({
                where: { userId: user.id },
                include: { role: true },
            });
            const roles = rawRoles.map((item) => item.role.alias);
            return {
                message: 'Thành công',
                success: true,
                data: { ...user, roles },
            };
        }
        catch (error) {
            throw new common_1.HttpException(error?.message ?? 'Internal Server', error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map