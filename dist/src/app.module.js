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
const file_controller_1 = require("./crm/file/file.controller");
const file_service_1 = require("./crm/file/file.service");
const whitelist_controller_1 = require("./crm/admin/whitelist/whitelist.controller");
const cache_manager_1 = require("@nestjs/cache-manager");
const app_config_1 = require("../configs/app-config");
const cache_service_1 = require("../services/cache.service");
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
const wish_service_1 = require("./wishs/wish.service");
const wish_controller_1 = require("./wishs/wish.controller");
const systemConfig_1 = require("./crm/system/systemConfig");
const adminConfig_1 = require("./crm/admin/adminConfig");
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
            wish_controller_1.WishController,
            whitelist_controller_1.WhiteListController,
            auth_controller_1.AuthController,
            file_controller_1.FileController,
            ...systemConfig_1.SystemControllers,
            ...adminConfig_1.AdminControllers,
        ],
        providers: [
            app_service_1.AppService,
            wish_service_1.WishService,
            prisma_service_1.PrismaService,
            auth_service_1.AuthService,
            file_service_1.FileService,
            cache_service_1.CacheService,
            ...systemConfig_1.SystemServices,
            ...adminConfig_1.AdminServices,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map