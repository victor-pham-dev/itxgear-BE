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
import { FileController } from './crm/file/file.controller'
import { FileService } from './crm/file/file.service'
import { WhiteListController } from './crm/admin/whitelist/whitelist.controller'
import { CacheModule } from '@nestjs/cache-manager'
import { tokenExpireTime } from 'configs/app-config'
import { CacheService } from 'services/cache.service'
import { redisStore } from 'cache-manager-redis-yet'
import { WishService } from './wishs/wish.service'
import { WishController } from './wishs/wish.controller'
import { SystemControllers, SystemServices } from './crm/system/systemConfig'
import { AdminControllers, AdminServices } from './crm/admin/adminConfig'
import { ProductController } from './crm/product/product.controller'
import { ProductService } from './crm/product/product.service'

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
    WishController,
    WhiteListController,
    AuthController,
    FileController,
    ProductController,
    ...SystemControllers,
    ...AdminControllers,
  ],
  providers: [
    AppService,
    ProductService,
    WishService,
    PrismaService,
    AuthService,
    FileService,
    CacheService,
    ...SystemServices,
    ...AdminServices,
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
