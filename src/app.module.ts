import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JwtMiddleware } from 'middleware/jwt.middleware'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { AuthController } from './auth/auth.controller'
import { PrismaService } from 'services/prisma.service'
import { AuthService } from './auth/auth.service'
import { RoleService } from './role/role.service'
import { RoleController } from './role/role.controller'
import { UserRoleService } from './user_role/user_role.service'
import { UserRoleController } from './user_role/user_role.controller'
import { BannerController } from './promotion/banner/banner.controller'
import { BannerSerivce } from './promotion/banner/banner.service'
import { VoucherController } from './promotion/voucher/voucher.controller'
import { VoucherService } from './promotion/voucher/voucher.service'
import { CategoryController } from './category/category.controller'
import { CategoryService } from './category/category.service'
import { UserService } from './user/user.service'
import { UserController } from './user/user.controller'
import { ProductController } from './product/product.controller'
import { ProductService } from './product/product.service'
import { WarehouseItemController } from './warehouse/item/warehouse_item.controller'
import { WarehouseItemService } from './warehouse/item/warehouse_item.service'
import { WarehouseBillController } from './warehouse/bill/warehouse_bill.controller'
import { WarehouseBillService } from './warehouse/bill/warehouse_bill.service'
import { PublicOrderController } from './public/order/public_order.controller'
import { PublicOrderService } from './public/order/public_order.service'
import { PublicProductController } from './public/product/public_product.controller'
import { PublicProductService } from './public/product/public_product.service'

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
  ],
  providers: [
    AppService,
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        '/api/v1/auth/me',
        '/api/v1/product',
        '/api/v1/order',
        '/api/v1/admin',
      )
  }
}
