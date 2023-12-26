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
exports.WarehouseBillController = void 0;
const common_1 = require("@nestjs/common");
const warehouse_bill_service_1 = require("./warehouse_bill.service");
const warehouse_bill_dto_1 = require("./warehouse_bill.dto");
const swagger_1 = require("@nestjs/swagger");
let WarehouseBillController = class WarehouseBillController {
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
exports.WarehouseBillController = WarehouseBillController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create ' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouse_bill_dto_1.CreateBillDto]),
    __metadata("design:returntype", Promise)
], WarehouseBillController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: 'UPDATE ' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WarehouseBillController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'GET DETAIL BY ID' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WarehouseBillController.prototype, "get", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'SEARCH' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WarehouseBillController.prototype, "search", null);
exports.WarehouseBillController = WarehouseBillController = __decorate([
    (0, common_1.Controller)('/api/v1/warehouse/bill'),
    (0, swagger_1.ApiTags)('Warehouse Bill'),
    __metadata("design:paramtypes", [warehouse_bill_service_1.WarehouseBillService])
], WarehouseBillController);
//# sourceMappingURL=warehouse_bill.controller.js.map