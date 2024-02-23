import { PublicCategoryController } from './category/public_category.controller'
import { PublicCategoryService } from './category/public_category.service'
import { PublicDuckyController } from './ducky/ducky.controller'
import { PublicDuckyService } from './ducky/ducky.service'
import { PublicOrderController } from './order/public_order.controller'
import { PublicOrderService } from './order/public_order.service'
import { PublicProductController } from './product/public_product.controller'
import { PublicProductService } from './product/public_product.service'
import { PublicSystemController } from './system/public_system.controller'
import { PublicSystemService } from './system/public_system.service'

export const PublicControllers = [
  PublicProductController,
  PublicOrderController,
  PublicCategoryController,
  PublicSystemController,
  PublicDuckyController,
]

export const PublicServices = [
  PublicCategoryService,
  PublicOrderService,
  PublicProductService,
  PublicSystemService,
  PublicDuckyService,
]
