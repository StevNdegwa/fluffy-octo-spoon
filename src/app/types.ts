export interface IStudentClass {
  Students: Array<string>;
  Name: string;
}

export type StudentIDMapType = {
  [id: string]: string;
}

export interface IAirTableRecord {
  id: string;
  fields: {
    [key: string]: unknown;
  }
}