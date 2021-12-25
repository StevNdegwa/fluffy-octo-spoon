import { IStudentClass } from "../../types";
import { ActionType } from "../types";
import { SET_STUDENT_CLASSES, FETCH_STUDENT_CLASSES_ERROR } from "../actions";

export default function studentClasses(state = [], action: ActionType) {
  switch (action.type) {
    case SET_STUDENT_CLASSES:
      return [...state, ...(action.classes as Array<IStudentClass>)];
    case FETCH_STUDENT_CLASSES_ERROR:
      return [];
    default:
      return state;
  }
}
