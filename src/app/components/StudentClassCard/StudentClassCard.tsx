import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import Card from "../Card";
import { IStudentClass } from "../../types";
import { IAppState } from "../../redux/types";
import "./StudentClassCard.css";

export interface IStudentClassCard {
  classDetails: IStudentClass;
}

const StudentClassCard: FC<IStudentClassCard> = ({ classDetails }) => {
  const studentIdNameMap = useSelector(
    (state: IAppState) => state.studentsIDNameMap
  );

  const studentsNames = useMemo(() => {
    return classDetails.Students.map(
      (studentId) => studentIdNameMap[studentId]
    ).join(", ");
  }, [classDetails.Students, studentIdNameMap]);

  return (
    <Card className="student_class_card">
      <section>
        <h4 className="section_title">Name</h4>
        <div>{classDetails.Name}</div>
      </section>
      <section>
        <h4 className="section_title">Students</h4>
        <div>{studentsNames}</div>
      </section>
    </Card>
  );
};

export default StudentClassCard;
