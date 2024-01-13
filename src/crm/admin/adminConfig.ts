import { RoleController } from './role/role.controller'
import { RoleService } from './role/role.service'
import { UserController } from './user/user.controller'
import { UserService } from './user/user.service'
import { UserRoleController } from './user_role/user_role.controller'
import { UserRoleService } from './user_role/user_role.service'
import { WhiteListController } from './whitelist/whitelist.controller'
import { WhiteListService } from './whitelist/whitelist.service'

export const AdminControllers = [
  RoleController,
  UserController,
  UserRoleController,
  WhiteListController,
]

export const AdminServices = [
  RoleService,
  UserService,
  UserRoleService,
  WhiteListService,
]
