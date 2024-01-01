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
const banner_controller_1 = require("./crm/system/banner/banner.controller");
const banner_service_1 = require("./crm/system/banner/banner.service");
const voucher_controller_1 = require("./crm/system/voucher/voucher.controller");
const voucher_service_1 = require("./crm/system/voucher/voucher.service");
const category_controller_1 = require("./crm/system/category/category.controller");
const category_service_1 = require("./crm/system/category/category.service");
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
const whitelist_controller_1 = require("./crm/admin/whitelist/whitelist.controller");
const whitelist_service_1 = require("./crm/admin/whitelist/whitelist.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const app_config_1 = require("../configs/app-config");
const cache_service_1 = require("../services/cache.service");
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(jwt_middleware_1.JwtMiddleware)
            .exclude({
            path: '/api',
            method: common_1.RequestMethod.GET,
        }, {
            path: '/api/v1/auth/register',
            method: common_1.RequestMethod.POST,
        }, {
            path: '/api/v1/auth/login',
            method: common_1.RequestMethod.POST,
        }, {
            path: '/api/v1/auth/logout',
            method: common_1.RequestMethod.POST,
        }, {
            path: '/api/v1/wish',
            method: common_1.RequestMethod.ALL,
        })
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                useFactory: async () => ({
                    store: await (0, cache_manager_redis_yet_1.redisStore)({
                        socket: {
                            host: 'localhost',
                            port: 6379,
                        },
                    }),
                }),
            }),
            jwt_1.JwtModule.register({
                secret: process.env.TOKEN_KEY,
                signOptions: { expiresIn: app_config_1.tokenExpireTime },
            }),
        ],
        controllers: [
            app_controller_1.AppController,
            whitelist_controller_1.WhiteListController,
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
            whitelist_service_1.WhiteListService,
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
            cache_service_1.CacheService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map