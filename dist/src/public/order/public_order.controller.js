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
exports.PublicOrderController = void 0;
const common_1 = require("@nestjs/common");
const public_order_service_1 = require("./public_order.service");
const public_order_dto_1 = require("./public_order.dto");
const swagger_1 = require("@nestjs/swagger");
let PublicOrderController = class PublicOrderController {
    constructor(service) {
        this.service = service;
    }
    async create(createOrderDto) {
        return this.service.create(createOrderDto);
    }
};
exports.PublicOrderController = PublicOrderController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo đơn hàng ' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [public_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], PublicOrderController.prototype, "create", null);
exports.PublicOrderController = PublicOrderController = __decorate([
    (0, common_1.Controller)('/api/v1/public/order'),
    (0, swagger_1.ApiTags)('Public Order'),
    __metadata("design:paramtypes", [public_order_service_1.PublicOrderService])
], PublicOrderController);
//# sourceMappingURL=public_order.controller.js.map