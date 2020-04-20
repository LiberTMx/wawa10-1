import { TokensModel } from './tokens.model';
import { AuthUserModel } from './auth-user.model';
import { AuthRoleModel } from './auth-role.model';

export class AuthenticatedUserModel extends AuthUserModel {
    tokens: TokensModel;
    roles: Array<AuthRoleModel>;
}
