import { AuthDomainModel } from './auth-user.model';

export class AuthRoleModel 
{
    id: number;
    role: string;
    authDomain: AuthDomainModel;
}
