"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_middleware_1 = require("../middleware/jwt.middleware");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_controller_1 = require("./auth/auth.controller");
const prisma_service_1 = require("../services/prisma.service");
const auth_service_1 = require("./auth/auth.service");
const role_service_1 = require("./crm/admin/role/role.service");
const role_controller_1 = require("./crm/admin/role/role.controller");
const user_role_service_1 = require("./crm/admin/user_role/user_role.service");
const user_role_controller_1 = require("./crm/admin/user_role/user_role.controller");
const banner_controller_1 = require("./crm/admin/banner/banner.controller");
const banner_service_1 = require("./crm/admin/banner/banner.service");
const voucher_controller_1 = require("./crm/admin/voucher/voucher.controller");
const voucher_service_1 = require("./crm/admin/voucher/voucher.service");
const category_controller_1 = require("./crm/admin/category/category.controller");
const category_service_1 = require("./crm/admin/category/category.service");
const user_service_1 = require("./crm/admin/user/user.service");
const user_controller_1 = require("./crm/admin/user/user.controller");
const product_controller_1 = require("./crm/product/product.controller");
const product_service_1 = require("./crm/product/product.service");
const warehouse_item_controller_1 = require("./crm/warehouse/item/warehouse_item.controller");
const warehouse_item_service_1 = require("./crm/warehouse/item/warehouse_item.service");
const warehouse_bill_controller_1 = require("./crm/warehouse/bill/warehouse_bill.controller");
const warehouse_bill_service_1 = require("./crm/warehouse/bill/warehouse_bill.service");
const public_order_controller_1 = require("./public/order/public_order.controller");
const public_order_service_1 = require("./public/order/public_order.service");
const public_product_controller_1 = require("./public/product/public_product.controller");
const public_product_service_1 = require("./public/product/public_product.service");
const file_controller_1 = require("./crm/file/file.controller");
const file_service_1 = require("./crm/file/file.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(jwt_middleware_1.JwtMiddleware)
            .forRoutes('/api/v1/auth/me', '/api/v1/product', '/api/v1/order', '/api/v1/admin');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            jwt_1.JwtModule.register({
                secret: process.env.TOKEN_KEY,
                signOptions: { expiresIn: '72h' },
            }),
        ],
        controllers: [
            app_controller_1.AppController,
            auth_controller_1.AuthController,
            role_controller_1.RoleController,
            user_role_controller_1.UserRoleController,
            banner_controller_1.BannerController,
            voucher_controller_1.VoucherController,
            category_controller_1.CategoryController,
            user_controller_1.UserController,
            product_controller_1.ProductController,
            warehouse_item_controller_1.WarehouseItemController,
            warehouse_bill_controller_1.WarehouseBillController,
            public_order_controller_1.PublicOrderController,
            public_product_controller_1.PublicProductController,
            file_controller_1.FileController,
        ],
        providers: [
            app_service_1.AppService,
            prisma_service_1.PrismaService,
            auth_service_1.AuthService,
            role_service_1.RoleService,
            user_role_service_1.UserRoleService,
            banner_service_1.BannerSerivce,
            voucher_service_1.VoucherService,
            category_service_1.CategoryService,
            user_service_1.UserService,
            product_service_1.ProductService,
            warehouse_item_service_1.WarehouseItemService,
            warehouse_bill_service_1.WarehouseBillService,
            public_order_service_1.PublicOrderService,
            public_product_service_1.PublicProductService,
            file_service_1.FileService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map