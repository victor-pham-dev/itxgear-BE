"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServices = exports.AdminControllers = void 0;
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const user_role_controller_1 = require("./user_role/user_role.controller");
const user_role_service_1 = require("./user_role/user_role.service");
const whitelist_controller_1 = require("./whitelist/whitelist.controller");
const whitelist_service_1 = require("./whitelist/whitelist.service");
exports.AdminControllers = [
    user_controller_1.UserController,
    user_role_controller_1.UserRoleController,
    whitelist_controller_1.WhiteListController,
];
exports.AdminServices = [user_service_1.UserService, user_role_service_1.UserRoleService, whitelist_service_1.WhiteListService];
//# sourceMappingURL=adminConfig.js.map