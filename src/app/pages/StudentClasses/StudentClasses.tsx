import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../redux/types";
import { showStudentClasses } from "../../redux/actions";
import StudentClassCard from "../../components/StudentClassCard";
import "./StudentClasses.css";

const StudentClasses: FC = () => {
  const dispatch = useDispatch();
  const studentClasses = useSelector(
    (state: IAppState) => state.studentClasses
  );

  const handleLogOut = useCallback(() => {
    dispatch(showStudentClasses(false));
  }, [dispatch]);

  return (
    <>
      <header className="student_classes_page_header">
        <button onClick={handleLogOut} className="logout_btn">Log out</button>
      </header>
      <main className="student_classes_page_main">
        <div>
          {Boolean(studentClasses.length) ? (
            studentClasses.map((studentClass, index: number) => {
              return (
                <StudentClassCard classDetails={studentClass} key={index} />
              );
            })
          ) : (
            <div>Student has no assigned classes</div>
          )}
        </div>
      </main>
      <footer className="student_classes_page_footer"></footer>
    </>
  );
};

export default StudentClasses;
