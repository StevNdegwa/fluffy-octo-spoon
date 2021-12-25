import { ActionType } from "../types";
import { SHOW_STUDENT_CLASSES } from "../actions";

export default function showStudentClasses(state = false, action: ActionType) {
  switch (action.type) {
    case SHOW_STUDENT_CLASSES:
      return Boolean(action.show);
    default:
      return state;
  }
}