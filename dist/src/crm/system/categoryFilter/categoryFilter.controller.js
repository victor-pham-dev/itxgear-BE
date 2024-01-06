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
exports.CategoryFilterController = void 0;
const common_1 = require("@nestjs/common");
const categoryFilter_service_1 = require("./categoryFilter.service");
const categoryFilter_dto_1 = require("./categoryFilter.dto");
const swagger_1 = require("@nestjs/swagger");
let CategoryFilterController = class CategoryFilterController {
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
};
exports.CategoryFilterController = CategoryFilterController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create ' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [categoryFilter_dto_1.CreateCategoryFilterDto]),
    __metadata("design:returntype", Promise)
], CategoryFilterController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: 'UPDATE ' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [categoryFilter_dto_1.UpdateCategoryFilterDto]),
    __metadata("design:returntype", Promise)
], CategoryFilterController.prototype, "update", null);
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
], CategoryFilterController.prototype, "get", null);
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
    (0, swagger_1.ApiQuery)({
        name: 'name',
        description: 'Tên bộ lọc',
        required: false,
        type: String,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryFilterController.prototype, "search", null);
exports.CategoryFilterController = CategoryFilterController = __decorate([
    (0, common_1.Controller)('/api/v1/system/category-filter'),
    (0, swagger_1.ApiTags)('Category-Filter'),
    __metadata("design:paramtypes", [categoryFilter_service_1.CategoryFilterService])
], CategoryFilterController);
//# sourceMappingURL=categoryFilter.controller.js.map