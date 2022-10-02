import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import * as fromCActions from "../course.actions";
import { compareCourses, Course } from "../model/course";

export interface CourseState extends EntityState<Course> {
    //au lieu de declarer les props en dur on extend juste EtityState<Class>
    //entities: {[key: number]:Course}, // pour des besoins de perf on use un map (au lieu de course: Course[] et boucler a chaque fois )
    //ids: number[] //format de sorting basé sur notre model la prop seqNo
    allCoursesLoaded: boolean //ajouter pour ne pas appeler l'api getCourses une fois qu'il a déja été appelé
}

export const adapter  = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    selectId: course => course.id // au cas ou l'id se nomme autrement (donc pas nécessaire ici)
});
export const {selectAll} = adapter.getSelectors();

//export const initialCourseState = adapter.getInitialState(); avant
export const initialCourseState = adapter.getInitialState({
    allCoursesLoaded: false
});

function sortBySeqNo(e1: Course, e2: Course) {
    return e1.seqNo - e2.seqNo;
}


/*export const coursesReducer = createReducer(
    initialCourseState,
    on(fromCActions.AllCoursesLoaded,
        (state, action) => adapter.addAll(action, state))
);*/

export function coursesReducer(//add dans course.module StoreModule.forFeature("courses", coursesReducer)
    state = initialCourseState, 
    action: fromCActions.CourseListActions
    ){
    switch (action.type){
      case fromCActions.ALLCOURSELOADED:
        const courses = (action as fromCActions.AllCoursesLoaded).payload;
        return adapter.addMany(courses, {...state, allCoursesLoaded: true});// pas de addAll
    case fromCActions.COURSEUPDATED:
        return adapter.updateOne((action as fromCActions.CourseUpdated).payload, state);
      
      default:
        return state;
    }
  }