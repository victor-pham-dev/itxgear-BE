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
import { BannerController } from './crm/admin/banner/banner.controller'
import { BannerSerivce } from './crm/admin/banner/banner.service'
import { VoucherController } from './crm/admin/voucher/voucher.controller'
import { VoucherService } from './crm/admin/voucher/voucher.service'
import { CategoryController } from './crm/admin/category/category.controller'
import { CategoryService } from './crm/admin/category/category.service'
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    JwtModule.register({
      secret: process.env.TOKEN_KEY,
      signOptions: { expiresIn: '72h' },
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
      )
      .forRoutes('*')
  }
}
