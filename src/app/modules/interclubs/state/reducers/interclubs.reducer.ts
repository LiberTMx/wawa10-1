import { initialInterclubsState, InterclubsState } from '../insterclubs-state';
import { InterclubsActions } from '../actions/interclubs.actions';

export function interclubsReducer(state: InterclubsState = initialInterclubsState, action: InterclubsActions ): InterclubsState {

    if ( action !== null ) {
  
      const actionHandler = new ActionHandler(state, action);
      
      switch (action.type) {
  
        /*
        case AuthActionTypes.LoginAction: {
          return actionHandler.login();
        }
  
        case AuthActionTypes.LogoutAction: {
          return actionHandler.logout();
        }
        */
  
        default:
          // console.log('Executing default reducer !', action);
          return state;
      }
    }
  
    return state;
  }


class ActionHandler {

    constructor(private state: InterclubsState, private action: InterclubsActions) {}
  
    /*
    login(): AuthState {
      const a = this.action as any as LoginAction;
      const newState: AuthState = { ...this.state, user: a.payload.user,  loggedIn: true };
      return newState;
    }
  
    logout(): AuthState {
      const newState: AuthState = { ...this.state, user: null,  loggedIn: false };
      return newState;
    }
    */
}
