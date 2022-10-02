import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, tap } from "rxjs/operators";
import { CourseAction } from "./action-type";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {

    loadCourses$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CourseAction.LOADALLCOURSE),
        concatMap(action => this.coursesHttpService.findAllCourses()),
        map(courses => new CourseAction.AllCoursesLoaded(courses))
        )
    );
    //{ dispatch: false } //infinite loop si absent

    saveCourses$ = createEffect(() => 
    this.actions$.pipe(
        ofType(CourseAction.COURSEUPDATED),
        concatMap(action => this.coursesHttpService.saveCourse(
            (action as CourseAction.CourseUpdated).payload.id,
            (action as CourseAction.CourseUpdated).payload.changes
        ))
    ),
    {dispatch: false}
    )

    constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService){}
}