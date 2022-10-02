import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, finalize, first, tap } from "rxjs/operators";
import { AppState } from "../store/app.reducer";
import * as courseAction from "./course.actions";
import { areCousesLoaded } from "./courses.selector";

@Injectable()
export class CoursesResolver implements Resolve<any>{
    // exec une seule fois
    loading = false;
    constructor(private store: Store<AppState>){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.pipe(
            select(areCousesLoaded),
            tap(coursesLoaded => {
                if(!this.loading && !coursesLoaded){
                    this.loading = true;
                    this.store.dispatch(new courseAction.LoadAllCourses());
                }
            }),
            filter(coursesLoaded => coursesLoaded),
            first(),
            finalize(() => this.loading = false)
        );
    }

}