import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentClasses } from "../../redux/actions";
import { IAppState } from "../../redux/types";
import "./Home.css";

const Home: FC<{}> = () => {
  const [studentName, setStudentName] = useState("");

  const dispatch = useDispatch();
  const fetchingStudentClasses = useSelector(
    (state: IAppState) => state.fetchingStudentClasses
  );
  const fetchingStudentClassesError = useSelector(
    (state: IAppState) => state.fetchingStudentClassesError
  );

  const handleStudentNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setStudentName(event.target.value);
    },
    []
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(fetchStudentClasses(studentName));
  };

  return (
    <div className="home_wrapper">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="student">Student name: </label>
          <input
            type="text"
            name="student"
            placeholder="Student name"
            onChange={handleStudentNameChange}
            value={studentName}
            required
          />
          {Boolean(fetchingStudentClassesError) && (
            <div className="error_message">
              {fetchingStudentClassesError?.message}
            </div>
          )}
        </div>
        <p>
          <input
            type="submit"
            value={fetchingStudentClasses ? "Loading..." : "Log in"}
            disabled={fetchingStudentClasses}
          />
        </p>
      </form>
    </div>
  );
};

export default Home;
