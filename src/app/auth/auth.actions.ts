import { props, createAction, Action } from "@ngrx/store";
import { User } from "./model/user.model";

/*export const login = createAction(
    "[Login Page] User Login",
    props<{user: User}>()
);*/

export const LOGIN = '[Login Page] User Login';
export const LOGOUT = '[Top Menu] User Logout';

export class LoginAction implements Action {
    readonly type: string =  LOGIN;
    constructor(public payload: User ) {}
}

export class LogoutAction implements Action {
    readonly type: string =  LOGOUT;
}

export type AuthListActions =  LoginAction | LogoutAction;