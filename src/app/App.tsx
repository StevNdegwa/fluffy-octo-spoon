import { useSelector } from "react-redux";
import "./App.css";
import Home from "./pages/Home";
import StudentClasses from "./pages/StudentClasses";
import { IAppState } from "./redux/types";

function App() {
  const showStudentClasses = useSelector(
    (state: IAppState) => state.showStudentClasses
  );

  return !showStudentClasses ? <Home /> : <StudentClasses />;
}

export default App;
