import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserRoleController } from './user_role/user_role.controller';
import { UserRoleService } from './user_role/user_role.service';
import { WhiteListController } from './whitelist/whitelist.controller';
import { WhiteListService } from './whitelist/whitelist.service';
export declare const AdminControllers: (typeof WhiteListController | typeof UserController | typeof UserRoleController)[];
export declare const AdminServices: (typeof WhiteListService | typeof UserService | typeof UserRoleService)[];
