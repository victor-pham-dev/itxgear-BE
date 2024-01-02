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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const category_dto_1 = require("./category.dto");
const swagger_1 = require("@nestjs/swagger");
let CategoryController = class CategoryController {
    constructor(service) {
        this.service = service;
    }
    async create(createDto) {
        return this.service.create(createDto);
    }
    async update(updateDto) {
        return this.service.update(updateDto);
    }
    async get(req) {
        return this.service.get(req);
    }
    async search(req) {
        return this.service.search(req);
    }
    async getCategoryDetail(req) {
        return this.service.getCategoryDetail(req);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create ' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: 'UPDATE ' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'GET DETAIL BY ID' }),
    (0, swagger_1.ApiQuery)({
        name: 'id',
        required: true,
        type: Number,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "get", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'SEARCH' }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        description: 'Trang hiện tại',
        required: true,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'pageSize',
        description: 'Số lượng data / 1 trang',
        required: true,
        type: Number,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('/category-detail/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'GET DETAIL & LIST CHILDREN CATEGORY BY ID' }),
    (0, swagger_1.ApiQuery)({
        name: 'id',
        required: true,
        type: Number,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryDetail", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('/api/v1/system/category'),
    (0, swagger_1.ApiTags)('Category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map