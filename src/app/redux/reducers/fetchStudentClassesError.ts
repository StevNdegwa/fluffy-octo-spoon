import { ActionType, FetchError } from "../types";
import { FETCH_STUDENT_CLASSES_ERROR } from "../actions";


export default function fetchStudentClassesError(state = null, action: ActionType) {
  switch (action.type) {
    case FETCH_STUDENT_CLASSES_ERROR:
      return action.error as FetchError;
    default:
      return state;
  }
}