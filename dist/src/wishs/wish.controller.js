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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const wish_service_1 = require("./wish.service");
const wish_dto_1 = require("./wish.dto");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(wishService) {
        this.wishService = wishService;
    }
    async create(createDto) {
        return this.wishService.create(createDto);
    }
    async search(req) {
        return this.wishService.search(req);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create Wish' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wish_dto_1.CreateWishDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'SEARCH' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "search", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('/api/v1/wish'),
    (0, swagger_1.ApiTags)(' :)) dont touch this '),
    __metadata("design:paramtypes", [wish_service_1.WishService])
], AuthController);
//# sourceMappingURL=wish.controller.js.map