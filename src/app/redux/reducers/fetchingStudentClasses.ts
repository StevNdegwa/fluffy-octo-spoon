import { ActionType } from "../types";
import { FETCHING_STUDENT_CLASSES } from "../actions";

export default function fetchingStudentClasses(state = false, action: ActionType) {
  switch (action.type) {
    case FETCHING_STUDENT_CLASSES:
      return Boolean(action.isFetching);
    default:
      return state;
  }
}