import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  user,
  setCurrentStudentsClass,
  setClasses,
  selectClasses,
} from "../../slices/dataSlice";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { getAllMyModules, reqMyAttendance } from "../request";
import "./StudentHome.css";

function StudentHome() {
  const authUser = useSelector(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useSelector(selectClasses);
  const select = (data) => {
    reqMyAttendance(data._id,authUser._id).then((res) => {
      console.log(data);
      dispatch(setCurrentStudentsClass({
        currentClass:data,
        currentStudent:authUser,
        attendance:res.data

      }));
      return navigate("/single-student");
    });
  };
  useEffect(() => {
    console.log("hello workd");
    getAllMyModules(authUser._id)
      .then((res) => dispatch(setClasses(res.data)))
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <div>
      <Header>
        {
          <div className="header_options" onClick={() => navigate("/")}>
            <span className="opt1">{authUser?.name}</span>
            <span className="opt2">sign out</span>
          </div>
        }
      </Header>
      <br />
      {classes.map((clas, index) => (
        <div key = {clas._id} className="cards">
          <div className="card">
            <div
              className="single-class-container"
              key={index}
              onClick={() =>
                select(clas)
              }
            >
              <h3>{clas.moduleName}</h3>
              <p>{clas.moduleCode}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentHome;
