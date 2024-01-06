"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemServices = exports.SystemControllers = void 0;
const banner_controller_1 = require("./banner/banner.controller");
const banner_service_1 = require("./banner/banner.service");
const category_controller_1 = require("./category/category.controller");
const category_service_1 = require("./category/category.service");
const categoryFilter_controller_1 = require("./categoryFilter/categoryFilter.controller");
const categoryFilter_service_1 = require("./categoryFilter/categoryFilter.service");
const voucher_controller_1 = require("./voucher/voucher.controller");
const voucher_service_1 = require("./voucher/voucher.service");
exports.SystemControllers = [
    banner_controller_1.BannerController,
    category_controller_1.CategoryController,
    categoryFilter_controller_1.CategoryFilterController,
    voucher_controller_1.VoucherController,
];
exports.SystemServices = [
    banner_service_1.BannerSerivce,
    category_service_1.CategoryService,
    categoryFilter_service_1.CategoryFilterService,
    voucher_service_1.VoucherService,
];
//# sourceMappingURL=systemConfig.js.map