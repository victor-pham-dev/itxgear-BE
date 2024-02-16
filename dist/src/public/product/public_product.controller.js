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
exports.PublicProductController = void 0;
const common_1 = require("@nestjs/common");
const public_product_service_1 = require("./public_product.service");
const swagger_1 = require("@nestjs/swagger");
const public_product_dto_1 = require("./public_product.dto");
let PublicProductController = class PublicProductController {
    constructor(service) {
        this.service = service;
    }
    async get(req) {
        return this.service.get(req);
    }
    async search(req) {
        return this.service.search(req);
    }
    async getOutStandingExams() {
        return this.service.getOutStandingExams();
    }
    async incrementView(data) {
        return this.service.incrementView(data);
    }
    async getRelated(req) {
        return this.service.getRelatedProducts(req);
    }
    async getDetailForCart(getDetailDto) {
        return this.service.getDetailForCart(getDetailDto);
    }
};
exports.PublicProductController = PublicProductController;
__decorate([
    (0, common_1.Get)(':alias'),
    (0, swagger_1.ApiOperation)({ summary: 'Tìm kiếm sản phẩm theo alias' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicProductController.prototype, "get", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'SEARCH' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicProductController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('/homepage/out-standing'),
    (0, swagger_1.ApiOperation)({ summary: '5 Sản phẩm nổi bật' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicProductController.prototype, "getOutStandingExams", null);
__decorate([
    (0, common_1.Put)('/increment-view'),
    (0, swagger_1.ApiOperation)({ summary: 'Tăng lượt view cho sản phẩm' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [public_product_dto_1.IncrementViewDto]),
    __metadata("design:returntype", Promise)
], PublicProductController.prototype, "incrementView", null);
__decorate([
    (0, common_1.Get)('/detail/related'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách sản phẩm liên quan' }),
    (0, swagger_1.ApiQuery)({
        name: 'rootCategoryId',
        description: 'id danh mục gốc',
        required: true,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'currentProductId',
        description: 'id sản phẩm hiện tại cần tìm danh sách liên quan',
        required: true,
        type: Number,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicProductController.prototype, "getRelated", null);
__decorate([
    (0, common_1.Post)('/detail/cart-items'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin sản phẩm theo ids' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [public_product_dto_1.GetDetailForCartDto]),
    __metadata("design:returntype", Promise)
], PublicProductController.prototype, "getDetailForCart", null);
exports.PublicProductController = PublicProductController = __decorate([
    (0, common_1.Controller)('/api/v1/public/product'),
    (0, swagger_1.ApiTags)('Public / Product'),
    __metadata("design:paramtypes", [public_product_service_1.PublicProductService])
], PublicProductController);
//# sourceMappingURL=public_product.controller.js.map