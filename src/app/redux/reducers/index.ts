import { combineReducers } from "redux";
import studentClasses from "./studentClasses";
import fetchingStudentClasses from "./fetchingStudentClasses";
import studentsIDNameMap from "./studentsIDNameMap";
import fetchingStudentClassesError from "./fetchStudentClassesError";
import showStudentClasses from "./showStudentClasses";

const reducers = combineReducers({
  studentClasses,
  fetchingStudentClasses,
  fetchingStudentClassesError,
  studentsIDNameMap,
  showStudentClasses
});

export default reducers;