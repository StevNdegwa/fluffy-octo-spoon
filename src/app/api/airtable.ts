import { AxiosResponse } from "axios";
import { IStudentClass, IAirTableRecord, StudentIDMapType } from "../types";
import { axios } from "./axios";

export class AirtableAPI {
  static getStudentClasses(studentName: string): Promise<Array<string>> {
    studentName = studentName.trim();

    if (!studentName) throw new Error("Invalid name");

    let params = new URLSearchParams();

    params.set("filterByFormula", `{Name}='${studentName}'`);
    params.set("fields[]", "Classes");

    return axios.get(`/Students?${params}`)
      .then((response: AxiosResponse) => response.data.records.map((record: any) => record.fields.Classes).flat())
  }

  static getClassesByIDs(classIDs: Array<string>): Promise<Array<IStudentClass>> | void {
    if (!classIDs.length) return;

    classIDs = Array.from(new Set(classIDs));

    let params = new URLSearchParams();
    params.set("filterByFormula", `SEARCH(RECORD_ID(),'${classIDs.join()}')`)

    return axios.get(`/Classes?${params}`)
      .then((response: AxiosResponse) => response.data.records.map((record: any) => record.fields))
  }

  static getStudentNamesByID(studentIDs: Array<string>): Promise<StudentIDMapType> | void {
    if (!studentIDs.length) return;

    studentIDs = Array.from(new Set(studentIDs));

    let params = new URLSearchParams();

    params.set("filterByFormula", `SEARCH(RECORD_ID(),'${studentIDs.join()}')`);
    params.set("fields[]", "Name");

    return axios.get(`/Students?${params}`)
      .then((response: AxiosResponse) => {
        let map: StudentIDMapType = {};

        response.data.records.forEach((record: IAirTableRecord) => {
          map[record.id] = String(record.fields.Name);
        });

        return map;
      })
  }
}