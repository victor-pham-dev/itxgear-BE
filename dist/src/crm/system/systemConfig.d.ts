import { BannerController } from './banner/banner.controller';
import { BannerSerivce } from './banner/banner.service';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategoryFilterController } from './categoryFilter/categoryFilter.controller';
import { CategoryFilterService } from './categoryFilter/categoryFilter.service';
import { VoucherController } from './voucher/voucher.controller';
import { VoucherService } from './voucher/voucher.service';
export declare const SystemControllers: (typeof BannerController | typeof CategoryController | typeof CategoryFilterController | typeof VoucherController)[];
export declare const SystemServices: (typeof BannerSerivce | typeof CategoryService | typeof CategoryFilterService | typeof VoucherService)[];
