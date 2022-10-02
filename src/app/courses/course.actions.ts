import { Update } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Course } from "./model/course";

export const LOADALLCOURSE = '[Course Resolver] Load All Courses';
export const ALLCOURSELOADED = '[Load Courses Effect] All Courses Loaded';
export const COURSEUPDATED = '[Edit Course Dialog] Course Updated';

export class LoadAllCourses implements Action {
    readonly type: string =  LOADALLCOURSE;
}

export class AllCoursesLoaded implements Action {
    readonly type: string =  ALLCOURSELOADED;
    constructor(public payload: Course[]){}
}

export class CourseUpdated implements Action {
    readonly type: string = COURSEUPDATED;
    constructor(public payload: Update<Course>){}
}

export type CourseListActions =  LoadAllCourses | AllCoursesLoaded | CourseUpdated;

