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
exports.WhiteListController = void 0;
const common_1 = require("@nestjs/common");
const whitelist_service_1 = require("./whitelist.service");
const whitelist_dto_1 = require("./whitelist.dto");
const swagger_1 = require("@nestjs/swagger");
let WhiteListController = class WhiteListController {
    constructor(service) {
        this.service = service;
    }
    async create(createDto) {
        return this.service.create(createDto);
    }
    async search(req) {
        return this.service.search(req);
    }
    async delete(req) {
        return this.service.delete(req);
    }
};
exports.WhiteListController = WhiteListController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create ' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [whitelist_dto_1.CreateWhiteListDto]),
    __metadata("design:returntype", Promise)
], WhiteListController.prototype, "create", null);
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
        name: 'email',
        description: 'Email',
        required: false,
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
        schema: {},
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhiteListController.prototype, "search", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete BY ID' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhiteListController.prototype, "delete", null);
exports.WhiteListController = WhiteListController = __decorate([
    (0, common_1.Controller)('/api/v1/admin/whitelist/email'),
    (0, swagger_1.ApiTags)('Admin/ promote Email  for allow user register'),
    __metadata("design:paramtypes", [whitelist_service_1.WhiteListService])
], WhiteListController);
//# sourceMappingURL=whitelist.controller.js.map