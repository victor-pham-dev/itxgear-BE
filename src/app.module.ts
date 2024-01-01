import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JwtMiddleware } from 'middleware/jwt.middleware'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { AuthController } from './auth/auth.controller'
import { PrismaService } from 'services/prisma.service'
import { AuthService } from './auth/auth.service'
import { RoleService } from './crm/admin/role/role.service'
import { RoleController } from './crm/admin/role/role.controller'
import { UserRoleService } from './crm/admin/user_role/user_role.service'
import { UserRoleController } from './crm/admin/user_role/user_role.controller'
import { BannerController } from './crm/system/banner/banner.controller'
import { BannerSerivce } from './crm/system/banner/banner.service'
import { VoucherController } from './crm/system/voucher/voucher.controller'
import { VoucherService } from './crm/system/voucher/voucher.service'
import { CategoryController } from './crm/system/category/category.controller'
import { CategoryService } from './crm/system/category/category.service'
import { UserService } from './crm/admin/user/user.service'
import { UserController } from './crm/admin/user/user.controller'
import { ProductController } from './crm/product/product.controller'
import { ProductService } from './crm/product/product.service'
import { WarehouseItemController } from './crm/warehouse/item/warehouse_item.controller'
import { WarehouseItemService } from './crm/warehouse/item/warehouse_item.service'
import { WarehouseBillController } from './crm/warehouse/bill/warehouse_bill.controller'
import { WarehouseBillService } from './crm/warehouse/bill/warehouse_bill.service'
import { PublicOrderController } from './public/order/public_order.controller'
import { PublicOrderService } from './public/order/public_order.service'
import { PublicProductController } from './public/product/public_product.controller'
import { PublicProductService } from './public/product/public_product.service'
import { FileController } from './crm/file/file.controller'
import { FileService } from './crm/file/file.service'
import { WhiteListController } from './crm/admin/whitelist/whitelist.controller'
import { WhiteListService } from './crm/admin/whitelist/whitelist.service'
import { CacheModule } from '@nestjs/cache-manager'
import { tokenExpireTime } from 'configs/app-config'
import { CacheService } from 'services/cache.service'
import { redisStore } from 'cache-manager-redis-yet'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
      }),
    }),
    JwtModule.register({
      secret: process.env.TOKEN_KEY,
      signOptions: { expiresIn: tokenExpireTime },
    }),
  ],
  controllers: [
    AppController,
    WhiteListController,
    AuthController,
    RoleController,
    UserRoleController,
    BannerController,
    VoucherController,
    CategoryController,
    UserController,
    ProductController,
    WarehouseItemController,
    WarehouseBillController,
    PublicOrderController,
    PublicProductController,
    FileController,
  ],
  providers: [
    AppService,
    WhiteListService,
    PrismaService,
    AuthService,
    RoleService,
    UserRoleService,
    BannerSerivce,
    VoucherService,
    CategoryService,
    UserService,
    ProductService,
    WarehouseItemService,
    WarehouseBillService,
    PublicOrderService,
    PublicProductService,
    FileService,
    CacheService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        {
          path: '/api',
          method: RequestMethod.GET,
        },
        {
          path: '/api/v1/auth/register',
          method: RequestMethod.POST,
        },
        {
          path: '/api/v1/auth/login',
          method: RequestMethod.POST,
        },
        {
          path: '/api/v1/auth/logout',
          method: RequestMethod.POST,
        },
        {
          path: '/api/v1/wish',
          method: RequestMethod.ALL,
        },
      )
      .forRoutes('*')
  }
}
