import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  user,
  setCurrentStudentsClass,
  setClasses,
  selectClasses,
} from "../../slices/dataSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { getAllMyModules, reqMyAttendance } from "../request";

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
      <Header/>
      <br />
      {classes.map((clas, index) => (
       
        <div className="card text-center my-2" type="button" key = {clas._id}  onClick={() => select(clas)}>
    <div className="card-header alert-success" >
    {clas.moduleName}
    </div>
    <div className="card-body">
      <h5 className="card-title">{clas.moduleCode}</h5>
      
  
    </div>
    <div className="card-footer text-muted">
      {clas.createdAt.split('T')[0]}
    </div>
  </div>
      ))}
    </div>
  );
}

export default StudentHome;
