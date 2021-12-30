import { Dispatch } from "redux";
import { AirtableAPI } from "../../api";
import { FetchError } from "../types";
import { StudentIDMapType, IStudentClass } from "../../types";

export const FETCHING_STUDENT_CLASSES = "FETCHING_STUDENT_CLASSES";
export const fetchingStudentClasses = (isFetching: Boolean) => ({ type: FETCHING_STUDENT_CLASSES, isFetching });

export const FETCH_STUDENT_CLASSES_ERROR = "FETCH_STUDENT_CLASSES_ERROR";
export const fetchStudentClassesError = (error: FetchError | null) => ({ type: FETCH_STUDENT_CLASSES_ERROR, error });

export const SET_STUDENT_CLASSES = "SET_STUDENT_CLASSES";
export const setStudentClasses = (classes: Array<IStudentClass>) => ({ type: SET_STUDENT_CLASSES, classes });

export const SET_STUDENTS_NAMES_MAP = "SET_STUDENTS_NAMES_MAP";
export const setStudentsNamesMap = (map: StudentIDMapType) => ({ type: SET_STUDENTS_NAMES_MAP, map });

export const SHOW_STUDENT_CLASSES = "SHOW_STUDENT_CLASSES";
export const showStudentClasses = (show: boolean) => ({ type: SHOW_STUDENT_CLASSES, show });

export function fetchStudentClasses(name: string) {
  return async (dispatch: Dispatch) => {
    dispatch(fetchingStudentClasses(true));
    dispatch(fetchStudentClassesError(null));

    try {
      let classIDs = await AirtableAPI.getStudentClasses(name);

      let classeDetails = await AirtableAPI.getClassesByIDs(classIDs);

      if (classeDetails) {
        dispatch(setStudentClasses(classeDetails));

        let studentIds = classeDetails.map((detail) => detail.Students).flat();

        let studentsMap = await AirtableAPI.getStudentNamesByID(studentIds);

        if (studentsMap)
          dispatch(setStudentsNamesMap(studentsMap));
      }

      dispatch(showStudentClasses(true));

    } catch (error: any) {
      let code = "UNKNOWN", message = error.message || "Unknown error";

      if (error.isAxiosError) {
        code = String(error.response?.status) || code;
        message = error.response?.statusText || message;
      }

      dispatch(
        fetchStudentClassesError({
          code,
          message
        }))

    } finally {

      dispatch(fetchingStudentClasses(false));

    }
  }
}
