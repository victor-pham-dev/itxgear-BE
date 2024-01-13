"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseListService = exports.WarehouseListController = void 0;
const warehouse_bill_controller_1 = require("./bill/warehouse_bill.controller");
const warehouse_bill_service_1 = require("./bill/warehouse_bill.service");
const warehouse_item_controller_1 = require("./item/warehouse_item.controller");
const warehouse_item_service_1 = require("./item/warehouse_item.service");
exports.WarehouseListController = [
    warehouse_bill_controller_1.WarehouseBillController,
    warehouse_item_controller_1.WarehouseItemController,
];
exports.WarehouseListService = [warehouse_bill_service_1.WarehouseBillService, warehouse_item_service_1.WarehouseItemService];
//# sourceMappingURL=warehouseConfig.js.map