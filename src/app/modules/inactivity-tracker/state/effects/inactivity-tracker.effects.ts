import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/observable/timer';
import { Observable } from 'rxjs/Observable';
import { filter, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthActionTypes } from '../../../auth/state/actions/auth.actions';
import { LogoutAction } from '../../../auth/state/actions/auth-logout.action';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class InactivityTrackerEffects {

    APPLICATION_INACTIVITY_TIME_OUT = 60 * 60 * 1000;

    constructor(private action$: Actions,
                private authService: AuthService,
                private router: Router,
    ) { }

    @Effect()
    extendInactivityTimeOut$ = this.action$.pipe(filter((action) =>
        !((action.type === AuthActionTypes.LogoutAction) )),
        switchMap(
            (action: Action) => {
                //console.log('Extending timer');
                const envTimeout = Number(`${environment.APPLICATION_INACTIVITY_TIME_OUT}`);
                const timeout = envTimeout ? envTimeout : this.APPLICATION_INACTIVITY_TIME_OUT;
                return Observable.timer(timeout);
            }
        ), map(() => {
            //console.log('Logging out since the max inactivity time is exceeded');
            this.authService.logout();
            this.router.navigate(['/']);
            return new LogoutAction();
        }));

}
