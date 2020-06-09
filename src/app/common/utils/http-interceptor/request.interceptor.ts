
import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { AuthenticatedUserModel } from '../../../modules/auth/model/authenticated-user.model';
import { Store } from '@ngrx/store';
import { LogoutAction } from '../../../modules/auth/state/actions/auth-logout.action';
import { AppState } from '../../../state/app.state';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private authService: AuthService;
  private router: Router;
  private isRefreshing = false;

  constructor(
      private inj: Injector, 
      private store: Store<AppState>, 
      //private envConfigService: EnvConfigService
    ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //const apiKey = this.envConfigService.getConfigValue(ConfigKeys.API_KEY);
    this.authService = this.inj.get(AuthService);
    this.router = this.inj.get(Router);

    const tokens = this.authService.getTokens();

    if (!this.authService.isAuthenticated() && tokens !== null && tokens !== undefined) {

      if (tokens.refreshToken && !this.isRefreshing) {
        this.isRefreshing = true;
        return this.authService
          .refreshToken(tokens.refreshToken)
          .pipe(mergeMap((res: AuthenticatedUserModel) => {
            //console.log('this.authService.storeData', res);
            // this.authService.storeData(res);
            /*
            const newUser: AuthenticatedUserModel=new AuthenticatedUserModel();
            Object.assign(newUser, res);
            this.authService.postProcessLogin(newUser);
            */
            //this.authService.updateUserTokens(res.tokens);

            this.isRefreshing = false;
            req = req.clone({
                setHeaders: {
                  ['Authorization']: `${res.tokens.accessToken}`,
                  //['x-api-key']: `${apiKey}`
                }
              });
            return next.handle(req);
          }),
            catchError(error => {
              this.isRefreshing = false;
              this.authService.logout();
              this.store.dispatch(new LogoutAction());
              this.router.navigate(['/auth/login']);
              return throwError(error);
            }));
      } 
      /*
      else {
        req = req.clone({
          setHeaders: {
            ['x-api-key']: `${apiKey}`
          }
        });
      }
      */
    } 
    
    if(tokens !== null && tokens !== undefined) 
    {
      req = req.clone({
        setHeaders: {
          Authorization: `${tokens.accessToken}`,
          //['x-api-key']: `${apiKey}`
        }
      });

    }
    
    return next.handle(req);
  }
}
