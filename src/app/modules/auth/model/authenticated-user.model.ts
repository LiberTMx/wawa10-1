import { TokensModel } from './tokens.model';
import { AuthUserModel } from './auth-user.model';
import { AuthRoleModel } from './auth-role.model';

export class AuthenticatedUserModel extends AuthUserModel {
    public tokens: TokensModel;
    public roles: Array<AuthRoleModel>;

    public setTokens(tokens: TokensModel)
    {
        //this.tokens=tokens;
        /*
        (this.tokens.accessToken as string) = tokens.accessToken;
        (this.tokens.refreshToken as string) = tokens.refreshToken;
        */
        (this.tokens as any).accessToken = tokens.accessToken;
        (this.tokens as any).refreshToken = tokens.refreshToken;
    }
}
