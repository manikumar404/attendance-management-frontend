import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signIn } from "../request";
import { useDispatch, useSelector } from "react-redux";
import { setUser, user } from "../../slices/dataSlice";
import logo from '../../../assets/logo.png'
import bg from '../../../assets/bg.svg'
import wave from '../../../assets/wave.png'
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(user);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [focuses, setFocuses] = useState({email:false,password:false})
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    signIn(inputs)
      .then((res) => {
        axios.defaults.headers.common['Authorization'] =res.data.token;
        dispatch(setUser(res.data));

        if (currentUser.userType === "tutor") {
          navigate("/home");
        }
        if (currentUser.userType === "student") {
          navigate("/student-home");
        }
        if (currentUser.userType === "admin") {
          navigate("/admin-dashboard");
        }
      })
      .catch((err) => {
        setInputs((values) => ({ ...values, message: err.response.data }));
        console.log(inputs);
      });
  };

  const focusE=()=>{
    setFocuses({...focuses,email:true})

  }

  const blurE=()=>{
    setFocuses({...focuses,email:false})

  }
  const focusP=()=>{
    setFocuses({...focuses,password:true})

  }

  const blurP=()=>{
    setFocuses({...focuses,password:false})

  }

  return (
    <div className="login">
      <img className="wave" src={wave} alt = "logo" />
      <div className="container">
        <div className="img">
          <img src={bg} alt = "background"/>
        </div>
        <div className="login-content">
          <form>
            <img src={logo} alt = "background"/>
            <h2 className="title">Attendance Management System</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                
                <input
                  type="email"
                  onFocus = {focusE}
                  onBlur = {blurE}
                  placeholder="Email"
               
                  name="email"
                 className={focuses.email?'input focus':'input'}
                  value={inputs.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
               
                <input
                  type="password"
                  name="password"
                   onFocus = {focusP}
                   placeholder='Password'
                   onBlur = {blurP}
                  className={focuses.password?'input focus':'input'}
                  value={inputs.password1}
                  onChange={handleChange}
                />
              </div>
            </div>
            <a  onClick={() => navigate("/signup")}>dont have account?</a>
            <p className="error">{inputs.message}</p>
            <input
              className="btn"
              type="submit"
             
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
