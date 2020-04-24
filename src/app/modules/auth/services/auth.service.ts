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

      if (!tokens.accessToken) {
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

    getTokens(): any 
    {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      return { accessToken, refreshToken };
    }

    getCurrentUser(): AuthenticatedUserModel 
    {
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
      
      let user: AuthenticatedUserModel=null;

      if (pUser!==null && pUser!==undefined) 
      {
        user=new AuthenticatedUserModel();
        Object.assign(user, pUser);
        this.store.dispatch( new LoginAction( {user}) );
      }
      else
      {
        this.store.dispatch( new LogoutAction());
      }

      this.userEvents.next(user);

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
     
    }

    preProcessLogin(user: AuthenticatedUserModel) 
    {
      this.preLoginuser=user;
    }

    getPreLoginUser(): AuthenticatedUserModel
    {
      return this.preLoginuser;
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
        const apiUrl=`${environment.apiUrl}/auth/resendPassword.json`;
        const postData = new FormData();
        postData.append('username' , username );
        return this.httpClient.post<MessageModel>( apiUrl, postData );
    }

    isUserSuperAdmin(): boolean
    {
      return this.isUserClubAdmin() && this.isUserStageAdmin() && this.isUserEntrainementAdmin();
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

    getUserList(): Observable<Array<AuthUserModel>>
    {
      const apiUrl=`${environment.apiUrl}/auth/liste`;
      return this.httpClient.get<Array<AuthUserModel>>( apiUrl );
    }
}
