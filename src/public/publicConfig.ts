import { PublicCategoryController } from './category/public_category.controller'
import { PublicCategoryService } from './category/public_category.service'
import { PublicOrderController } from './order/public_order.controller'
import { PublicOrderService } from './order/public_order.service'
import { PublicProductController } from './product/public_product.controller'
import { PublicProductService } from './product/public_product.service'

export const PublicControllers = [
  PublicProductController,
  PublicOrderController,
  PublicCategoryController,
]

export const PublicServices = [
  PublicCategoryService,
  PublicOrderService,
  PublicProductService,
]
