import { AuthUserGroupModel } from './auth-user-group.model';
import { StringUtils } from '../../common/utils/string-utils';
import { AuthFonctionModel } from './auth-fonction.model';

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
    //----
    sexe: string;
    dateNaissance: Date;
    rue: string;
    numero: string;
    boite: string;
    codePostal: string;
    localite: string;
    numTel: string;
    numTelPrive: string;
    numMobile: string;
    licence: string;
    classementMessieur: string;
    classementDame: string;
    createdAt: Date;
    updateddAt: Date;
    comment: string;
    commentComite: string;
    photo: string;
    deletedAt: Date;
    notifyParents: boolean;
    initCredential: boolean;
    lastLoginAt: Date;
    membreComite: boolean;
    isStageParticipantDiscret: boolean;
    gestionParentale: boolean;
    
    fonctions: Array<AuthFonctionModel>;
    //----
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
    showOrdre: number;
    activity: string;
}


