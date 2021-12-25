import { StudentIDMapType } from "../../types";
import { ActionType } from "../types";
import { SET_STUDENTS_NAMES_MAP } from "../actions";

export default function studentsIDNameMap(state: StudentIDMapType = {}, action: ActionType) {
  switch (action.type) {
    case SET_STUDENTS_NAMES_MAP:
      return action.map as StudentIDMapType;
    default:
      return state;
  }
}