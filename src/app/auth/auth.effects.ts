import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { LOGIN, LoginAction, LOGOUT } from "./auth.actions";

@Injectable()
export class AuthEffects {

    //pas d'observable manual avec le subscribe
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LOGIN),
            tap(action =>
                localStorage.setItem('user', JSON.stringify((action as LoginAction).payload))
            )
        ),
        { dispatch: false } //infinite loop si absent
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LOGOUT),
            tap(action => {
                localStorage.removeItem('user');
                this.router.navigateByUrl('/login');
            }
            )
        ),
        { dispatch: false } //infinite loop si absent
    );


    constructor(private actions$: Actions, private router: Router) {

        //login$.subscribe();
        /* methode simple
        actions$.subscribe(action => {
            if(action.type == LOGIN){
                localStorage.setItem('user', JSON.stringify((action as LoginAction).payload));
            }
        });*/
    }
}