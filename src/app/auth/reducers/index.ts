import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from '../model/user.model';
import * as fromAuthAction from '../auth.actions';

export interface AuthState {
  user: User;
}

export const authFeatureKey = 'auth';

const initialState: AuthState = {
  user: undefined,
}

export function authListReducers(
  state = initialState, 
  action: fromAuthAction.AuthListActions
  ){
  switch (action.type){
    case fromAuthAction.LOGIN:
      const user = (action as fromAuthAction.LoginAction).payload;
      return {
        //...state,
        user:user,
      };
    case fromAuthAction.LOGOUT:
      return {
        //...state,
        user: null
        };
    default:
      return state;
  }
}


/*export const authReducer = createReducer(
  initialState,
  on(fromAuthAction.LoginAction, (state, action)=>{
    return {
      user: action.user
    }
  })
);*/

