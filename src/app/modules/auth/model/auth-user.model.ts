import { AuthUserGroupModel } from './auth-user-group.model';
import { StringUtils } from '../../common/utils/string-utils';

export class AuthUserModel {

    id: number;
    username: string;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    mustChangePassword: boolean;
    changePasswordJeton: string;
    enabled: boolean;
    authUserGroup: AuthUserGroupModel;
    
    getFullName(): string
    {
        return StringUtils.titleCase( this.prenom + ' ' + this.nom );
    } 

    getId(): number
    {
        return this.id;
    }
}

export class AuthDomainModel
{
    id: number;
    domain: string;
    commentaire: string;
}

export class AuthRoleModel 
{
    id: number;
    role: string;
    authDomain: AuthDomainModel;
}
