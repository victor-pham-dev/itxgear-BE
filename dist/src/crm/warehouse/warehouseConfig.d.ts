import { WarehouseBillController } from './bill/warehouse_bill.controller';
import { WarehouseBillService } from './bill/warehouse_bill.service';
import { WarehouseItemController } from './item/warehouse_item.controller';
import { WarehouseItemService } from './item/warehouse_item.service';
export declare const WarehouseListController: (typeof WarehouseBillController | typeof WarehouseItemController)[];
export declare const WarehouseListService: (typeof WarehouseBillService | typeof WarehouseItemService)[];
