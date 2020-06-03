import { AuthState, initialAuthState } from '../auth-state';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { LoginAction } from '../actions/auth-login.action';

export function authReducer(state: AuthState = initialAuthState, action: AuthActions ): AuthState {

  if ( action !== null ) {

    const actionHandler = new ActionHandler(state, action);

    switch (action.type) {

      case AuthActionTypes.LoginAction: {
        return actionHandler.login();
      }

      case AuthActionTypes.LogoutAction: {
        return actionHandler.logout();
      }

      default:
        // console.log('Executing default reducer !', action);
        return state;
    }
  }

  return state;
}


class ActionHandler {

  constructor(private state: AuthState, private action: AuthActions) {}

  login(): AuthState {
    const a = this.action as any as LoginAction;
    console.log('auth reducer - login', a.payload.user);
    const newState: AuthState = { ...this.state, user: a.payload.user,  loggedIn: true };
    return newState;
  }

  logout(): AuthState {
    const newState: AuthState = { ...this.state, user: null,  loggedIn: false };
    return newState;
  }
}
