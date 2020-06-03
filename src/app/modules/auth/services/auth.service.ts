import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/observable/of';
import { AuthenticatedUserModel } from '../model/authenticated-user.model';
import { TokensModel } from '../model/tokens.model';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { selectAuthenticatedUser } from '../state/selectors/auth.selectors';
import { take, map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginAction } from '../state/actions/auth-login.action';
import { AppState } from '../../../state/app.state';
import { AuthUserModel } from '../model/auth-user.model';
import { environment } from '../../../../environments/environment';
import { MessageModel } from '../../../common/model/message.model';
import { LogoutAction } from '../state/actions/auth-logout.action';
import { AuthFonctionModel } from '../model/auth-fonction.model';
import { AuthGroupModel } from '../model/auth-group.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    // tslint:disable-next-line:variable-name
    //private _user: AuthenticatedUserModel = null;
    private preLoginuser: AuthenticatedUserModel = null;

    public userEvents = new BehaviorSubject<AuthenticatedUserModel>(undefined);

    constructor(
      private httpClient: HttpClient,
      private jwtHelperService: JwtHelperService,
      private store: Store<AppState>,
      ) { }

    isAuthenticated(): boolean {
      const tokens = this.getTokens();

      if (tokens!==null || tokens!==undefined || !tokens.accessToken) {
        return false;
      }

      return !this.jwtHelperService.isTokenExpired(tokens.accessToken);
    }

    async checkTokenStatus(): Promise<boolean> {
      if (this.isTokenExist()) {
        let status = true;
        if (this.isTokenExpired()) {
           // Wait till the token is refreshed
           const tokens = this.getTokens();
           await this.refreshTokenPromise(tokens.refreshToken).then(user => {
             status = true;
             this.postProcessLogin(user);
           }).catch(error => {
             console.log('Refresh token Expired!!!');
             status = false;
           });
        }
        // If the token is not expired, do nothing.
        return status;
      } else {
        return false;
      }
    }

    isTokenExist(): boolean {
      const tokens = this.getTokens();
      if (tokens.accessToken) {
        return true;
      } else {
        return false;
      }
    }

    isTokenExpired(): boolean 
    {
      // Note: Assumption is token exists. Do is tokenExists check first
      const tokens = this.getTokens();
      return this.jwtHelperService.isTokenExpired(tokens.accessToken);
    }

    getTokens(): { accessToken: string, refreshToken: string } 
    {
      /*
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      return { accessToken, refreshToken };
      */

      const currentUser = this.getCurrentUser();
      if(currentUser!==null && currentUser!==undefined)
      {
        return { accessToken: currentUser.tokens.accessToken, refreshToken: currentUser.tokens.refreshToken };
      }
    }

    getCurrentUser(): AuthenticatedUserModel 
    {
      /*
      let user = this.getUserFromStore();
      if ((user===null || user===undefined) && localStorage.getItem('user') ) {
        console.warn('getting user from local storage');
        const u: AuthUserModel = JSON.parse(localStorage.getItem('user'));
        user = u as AuthenticatedUserModel;
        const tokens = new TokensModel();
        Object.assign(tokens, this.getTokens());
        user.tokens = tokens;
        const newUser: AuthenticatedUserModel = new AuthenticatedUserModel();
        Object.assign(newUser, user);
        user = newUser;
        this.store.dispatch( new LoginAction({user}) );
        this.userEvents.next(user);
      }
      
      return user;
      */
      
      return this.getUserFromStore();
    }

    login(username: string, password: string): Observable<AuthenticatedUserModel> 
    {
      const url=`${environment.apiUrl}`;  
      const apiUrl = `${url}/auth/login/`;
      return this.httpClient.post<AuthenticatedUserModel>(apiUrl, { username, password })
        .pipe(
          map((data: AuthenticatedUserModel) => {
            const newUser: AuthenticatedUserModel=new AuthenticatedUserModel();
            Object.assign(newUser, data);
            return newUser;
          })
      );
    }

    logout() 
    {
      this.postProcessLogin(null);
    }

    changePassword(username: string, password: string, jeton: string): Observable<AuthenticatedUserModel> 
    {
      const url=`${environment.apiUrl}`;  
      const apiUrl = `${url}/auth/changePassword/`;
      return this.httpClient.post<AuthenticatedUserModel>(apiUrl, { username, password, jeton });
    }

    postProcessLogin(pUser: AuthenticatedUserModel) {
      
      //let user: AuthenticatedUserModel=null;

      if (pUser!==null && pUser!==undefined) 
      {
        /*
        console.log('authservice-postProcessLogin before dispatch ', pUser);
        user=new AuthenticatedUserModel();
        Object.assign(user, pUser);
        */
        this.store.dispatch( new LoginAction( {user: pUser}) );
        console.log('authservice-postProcessLogin after dispatch', /*user*/ pUser);
      }
      else
      {
        this.store.dispatch( new LogoutAction());
      }

      this.userEvents.next(/*user*/ pUser);

      /*
      if (user !== null) {
        localStorage.setItem('access_token', user.tokens.accessToken);
        localStorage.setItem('refresh_token', user.tokens.refreshToken);
        const u: AuthUserModel = user as AuthUserModel;
        localStorage.setItem('user', JSON.stringify(u));
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        localStorage.removeItem('lang');
        //this.store.dispatch( new CalendarInitAction());
        //this.languageService.determineDefaultLanguage();
      }
      */
     
    }

    preProcessLogin(user: AuthenticatedUserModel) 
    {
      this.preLoginuser=user;
    }

    getPreLoginUser(): AuthenticatedUserModel
    {
      return this.preLoginuser;
    }

    updateUserTokens(tokens: TokensModel)
    {
      const user=this.getCurrentUser();
      //user.tokens.accessToken=tokens.accessToken;
      //user.tokens.refreshToken=tokens.refreshToken;
      user.setTokens(tokens);
      this.store.dispatch( new LoginAction( {user}) );
    }
    refreshToken(refreshToken: string): Observable<any> {
      const url=`${environment.apiUrl}`;  
      const apiUrl = `${url}/auth/refresh-token/`;
      return this.httpClient.post(apiUrl, { refreshToken } );
    }

    refreshTokenPromise(refreshToken: string): Promise<any> {
      const url=`${environment.apiUrl}`; 
      const apiUrl = `${url}/auth/refresh-token/`;
      return this.httpClient.post(apiUrl, { refreshToken } ).toPromise();
    }

    getUserFromStore(): AuthenticatedUserModel {
      let user: AuthenticatedUserModel;
      this.store.pipe(select(selectAuthenticatedUser), take(1)).subscribe( res => user = res);
      return user;
    }

    resentPassword( username: string ): Observable<MessageModel>
    {
        const apiUrl=`${environment.apiUrl}/auth/resendPassword`;
        const postData = new FormData();
        postData.append('username' , username );
        return this.httpClient.post<MessageModel>( apiUrl, postData );
    }

    isUserSuperAdmin(): boolean
    {
      return this.isUserClubAdmin() && this.isUserStageAdmin() && this.isUserEntrainementAdmin();
    }

    isUserClubMembre(): boolean
    {
      // tslint:disable-next-line:variable-name
      const _user=this.getUserFromStore();
      if(_user===null || _user===undefined ) return false;
      if(_user.roles===null || _user.roles===undefined) return false;
      const role=_user.roles.find( r => r.authDomain.domain==='club' && r.role==='membre');
      return role !==null && role !== undefined;
    }

    isUserClubAdmin(): boolean
    {
      // tslint:disable-next-line:variable-name
      const _user=this.getUserFromStore();
      if(_user===null || _user===undefined ) return false;
      if(_user.roles===null || _user.roles===undefined) return false;
      const role=_user.roles.find( r => r.authDomain.domain==='club' && r.role==='admin');
      return role !==null && role !== undefined;
    }

    isUserStageAdmin(): boolean
    {
      // tslint:disable-next-line:variable-name
      const _user=this.getUserFromStore();
      if(! _user ) return false;
      if(_user.roles===null || _user.roles===undefined) return false;
      const role=_user.roles.find( r => r.authDomain.domain==='stage' && r.role==='admin');
      return role !==null && role !== undefined;
    }

    isUserEntrainementAdmin(): boolean
    {
      // tslint:disable-next-line:variable-name
      const _user=this.getUserFromStore();
      if(! _user ) return false;
      if(_user.roles===null || _user.roles===undefined) return false;
      const role=_user.roles.find( r => r.authDomain.domain==='entrainement' && r.role==='admin');
      return role !==null && role !== undefined;
    }

    getUserList(readAll: boolean): Observable<Array<AuthUserModel>>
    {
      const apiUrl=`${environment.apiUrl}/auth/liste/?readAll=${readAll}`;
      return this.httpClient.get<Array<AuthUserModel>>( apiUrl );
    }

    createUser(userFormValue: any, assignedFonctions: Array<AuthFonctionModel>, assignedRoles: Array<AuthGroupModel>): Observable<AuthUserModel>
    {
      const apiUrl=`${environment.apiUrl}/auth/createUser`;
      /*
      const postData = new FormData();
      postData.append('userFormValue' , userFormValue );
      postData.append('assignedFonctions' , JSON.stringify(assignedFonctions) );
      postData.append('assignedRoles' , JSON.stringify(assignedRoles) );
      return this.httpClient.post<AuthUserModel>( apiUrl, postData );
      */
      return this.httpClient.post<AuthUserModel>(apiUrl, 
          { 
            userFormValue, 
            assignedFonctions: JSON.stringify(assignedFonctions), 
            assignedRoles:  JSON.stringify(assignedRoles)
          });
    }

    getUserGroupsByUserId(userId: number): Observable<Array<AuthGroupModel>>
    {
      const apiUrl=`${environment.apiUrl}/auth/groups/${userId}`;
      return this.httpClient.get<Array<AuthGroupModel>>( apiUrl );
    }

    updateUser(userFormValue: any, assignedFonctions: Array<AuthFonctionModel>, assignedRoles: Array<AuthGroupModel>): Observable<AuthUserModel>
    {
      const apiUrl=`${environment.apiUrl}/auth/updateUser`;

      return this.httpClient.post<AuthUserModel>(apiUrl, 
          { 
            userFormValue, 
            assignedFonctions: JSON.stringify(assignedFonctions), 
            assignedRoles:  JSON.stringify(assignedRoles)
          });
    }

    deleteUserLogically(user: AuthUserModel): Observable<MessageModel>
    {
      const apiUrl=`${environment.apiUrl}/auth/deleteUserLogically`;

      return this.httpClient.post<MessageModel>(apiUrl, 
          { 
            userId: user.id, 
          });
    }

    deleteUserPermanently(user: AuthUserModel): Observable<MessageModel>
    {
      const apiUrl=`${environment.apiUrl}/auth/deleteUserPermanently`;

      return this.httpClient.post<MessageModel>(apiUrl, 
          { 
            userId: user.id, 
          });
    }

    resetUserPassword(user: AuthUserModel): Observable<MessageModel>
    {
      const apiUrl=`${environment.apiUrl}/auth/resetUserPassword`;

      return this.httpClient.post<MessageModel>(apiUrl, 
          { 
            userId: user.id, 
          });
    }

    reactivateUser(user: AuthUserModel): Observable<MessageModel>
    {
      const apiUrl=`${environment.apiUrl}/auth/reactivateUser`;

      return this.httpClient.post<MessageModel>(apiUrl, 
          { 
            userId: user.id, 
          });
    }

    findUserForClubComite(): Observable<Array<AuthUserModel>>
    {
      const apiUrl=`${environment.apiUrl}/auth/comite`;
      return this.httpClient.get<Array<AuthUserModel>>( apiUrl );
    }

    findUserByLicence(licence: string): Observable<AuthUserModel>
    {
      const apiUrl=`${environment.apiUrl}/auth/userByLicence/${licence}`;
      return this.httpClient.get<AuthUserModel>( apiUrl );
    }
}
