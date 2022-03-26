import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectClasses,
  deleteOneClass,
  user,
  setClasses,
} from "../../slices/dataSlice";
import { useEffect } from "react";
import SingleClass from "../../components/SingleClass/SingleClass";
import styles from "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { deleteClass, getAllStudentsByDepartment } from "../request";
import { getAllMyClasses } from "../request";

function Home() {
  const classes = useSelector(selectClasses);
  const [state, setState] = useState({
    input: "",
  });
  const authUser = useSelector(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const add = () => {
    return navigate("/add-class");
  };
  const handleChange = (event) => {
    setState({ ...state, input: event.target.value });
  };

  const deleteClass = (event) => {
    event.preventDefault();

    deleteClass(state.input)
      .then((res) => dispatch(deleteOneClass(state.input)))
      .catch((err) => console.log(err.response.data));
  };

  const getClasses = () => {
    getAllStudentsByDepartment(authUser._id,'4it').then(res=>console.log(res.data)).catch(err => console.lgg(err.response))
    getAllMyClasses(authUser._id,authUser.token)
      .then((res) => {
        console.log(res.data)
        dispatch(setClasses(res.data));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header>
        {
          <div className="header_options" onClick={add}>
            <span className="opt1">Add</span>
            <span className="opt2">New Class</span>
          </div>
        }
        {
          <div className="header_options" onClick={() => navigate("/")}>
            <span className="opt1">{authUser.name}</span>
            <span className="opt2">sign out</span>
          </div>
        }
      </Header>
      <br />

      <div className=" headmycl">
        <h2>Your Classes</h2>
      </div>
      <button className="btn" onClick={getClasses}>
        
        show your classes
      </button>

      <br/>
      {classes.length>0&&classes.map((clas, index) => (
        <SingleClass key={clas._id} index={index} {...clas} />
      ))}
    </div>
  );
}

export default Home;
