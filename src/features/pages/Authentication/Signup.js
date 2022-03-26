import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../request";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/dataSlice";
import logo from "../../../assets/logo.png";
import bg from "../../../assets/bg.svg";
import wave from "../../../assets/wave.png";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({gender:"Male"});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs.gender)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(inputs.password === inputs.password2){
      signUp(inputs)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setUser(res.data));
          navigate("/");
        } else {
          console.log(res);
        }
      })
      .catch((err) => setInputs({...inputs,message:err.response.data}));

    }
   
  };
  return (
    <div className="login">
      <img className="wave" src={wave} alt="logo" />
      <div className="container">
        <div className="img">
          <img src={bg} alt="background" />
        </div>
        <div className="login-content">
          <form>
            <img src={logo} alt="background" />
            <h2 className="title">Attendance Management System</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  type="text"
                  name="token"
                  placeholder="token"
                  value={inputs.token}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={inputs.name}
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
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  type="text"
                  name="department"
                  value={inputs.department}
                  placeholder="Groupa Id"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label  className="text-light">
                Gender
              </label>
              <div className="radio inline">
                <input
                  className="inline"
                  type="radio"
                  id="radio-2"
                  value="Male"
                  name="gender"
                  // checked={inputs.gender === "Male"}
                  // onChange={handleChange}
                />
                <label  className="radio-label">
                  Male
                </label>
              </div>
              <div className="radio inline">
              <input
                  className="inline"
                  type="radio"
                  id="radio-2"
                  value="Female"
                  name="gender"
                  // checked={inputs.gender === "Female"}
                  // onChange={handleChange}
                />
                <label className="radio-label">
                  Female
                </label>
              </div>
            </div>
           
                <select
                  name="userType"
                  value={inputs.userType}
                  onChange={handleChange}
                  placeholder="User Type"
                >
                  <option value="select type ">select user type</option>
                  <option value="student">student</option>
                  <option value="tutor">tutor</option>
                </select>
              
            
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={inputs.password1}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  type="Password"
                  className={
                    inputs.password === inputs.password2
                      ? "password-right"
                      : "password-wrong"
                  }
                  name="password2"
                  placeholder="confirm password"
                  value={inputs.password2}
                  onChange={handleChange}
                />
              </div>
            </div>
            <a onClick={() => navigate("/")}>already have an account?</a>
            <p className="error">{inputs.message}</p>
            <input className="btn" type="submit" onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
