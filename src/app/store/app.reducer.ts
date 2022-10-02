import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/reducers/index';

export interface AppState {
    auth: fromAuth.AuthState;
    router: RouterReducerState;
}


export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authListReducers,
    router: routerReducer,
    //auth: null
}

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        console.log('state before: ', state);
        console.log('action: ', action);
        return reducer(state, action);
    }
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];