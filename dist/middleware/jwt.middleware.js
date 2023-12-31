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
exports.JwtMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtMiddleware = class JwtMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    use(req, res, next) {
        const token = req.headers['x-access-token'];
        const originUrl = req.originalUrl;
        if (!token || token?.trim()?.length === 0) {
            throw new common_1.UnauthorizedException('No token provided');
        }
        if (token) {
            try {
                const decoded = this.jwtService.verify(token);
                console.log('🚀 ~ file: jwt.middleware.ts:29 ~ JwtMiddleware ~ use ~ decoded:', decoded, originUrl);
                if (!decoded?.roles?.some((role) => originUrl?.includes(`v1/${role}`)) &&
                    originUrl !== '/api/v1/auth/me') {
                    throw new common_1.UnauthorizedException('No permission');
                }
                req['user'] = decoded;
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
        }
        next();
    }
};
exports.JwtMiddleware = JwtMiddleware;
exports.JwtMiddleware = JwtMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtMiddleware);
//# sourceMappingURL=jwt.middleware.js.map