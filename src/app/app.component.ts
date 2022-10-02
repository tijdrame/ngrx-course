import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './store/app.reducer';
import * as fromActions from './auth/auth.actions';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$ : Observable<boolean>;
    isLoggedOut$ : Observable<boolean>;

    constructor(private router: Router, private store: Store<AppState>) {

    }

    ngOnInit() {
      const userProfile = localStorage.getItem('user');
      if(userProfile){
        this.store.dispatch(
          new fromActions.LoginAction(JSON.parse(userProfile))
        );
      }

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      //this.store.subscribe((state) => console.log('state value = ', state));
      this.isLoggedIn$ = this.store
            .pipe(
              //map(state => !!state['auth'].user)
              select(isLoggedIn)
              //il ne sera recaluler tant que le user n'a pas changé d'état (login/logout)
              //le select remove les duplications 
              // le selectorne recalcul que si la valeur d'entree change (user login/logout)
            );
      this.isLoggedOut$ = this.store
            .pipe(
              select(isLoggedOut)
            );
    }

    logout() {
        this.store.dispatch(new fromActions.LogoutAction())
    }

}
