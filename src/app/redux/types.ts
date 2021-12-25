import { IStudentClass, StudentIDMapType } from "../types";

export type ActionType = {
  type: string;
  [payload: string]: unknown;
}

export type FetchError = {
  code: string;
  message: string;
}

export interface IAppState {
  studentClasses: Array<IStudentClass>,
  fetchingStudentClasses: boolean;
  fetchingStudentClassesError: FetchError | null;
  studentsIDNameMap: StudentIDMapType;
  showStudentClasses: boolean;
}