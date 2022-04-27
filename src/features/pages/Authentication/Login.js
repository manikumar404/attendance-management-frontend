import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signIn } from "../request";
import { useDispatch, useSelector } from "react-redux";
import { setUser, user } from "../../slices/dataSlice";
import logo from '../../../assets/logo.png'
import axios from "axios";
import ring from "../../../assets/ringff.png";


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
    <section className="login">
  <div className="container mt-5">    
  
  <div className="row ">        
          <div className="col-md-6">
    <form className="login-form m-5 ">
      <div className="row">
        <div className="col-2">
        <img src={logo} alt = "background" width='50px'/>
        </div>
        <div className="col-10">
        <h4 className="title text-success">Attendance Management System</h4>
        </div>
      </div>      <br/>
     
      {/* <!-- Email input --> */}
     <div class="form-outline mb-4">
      <label class="form-label" for="form2Example1">Email address</label>
      <input                
        type="email"
        onFocus = {focusE}
        onBlur = {blurE}
        placeholder="Email"
        name="email"
        //className={focuses.email?'input focus':'input'}
        className="form-control"
        value={inputs.email}
        onChange={handleChange}
      />
    
  </div>

  {/* <!-- Password input --> */}
  <div class="form-outline mb-4">
  <label class="form-label" for="form2Example2">Password</label>
  <input
                  type="password"
                
                  name="password"
                   onFocus = {focusP}
                   placeholder='Password'
                   onBlur = {blurP}
                   className="form-control"
                 // className={focuses.password?'input focus':'input'}
                  value={inputs.password1}
                  onChange={handleChange}
                />    
  </div>

  {/* <!-- 2 column grid layout for inline styling --> */}
  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      {/* <!-- Checkbox --> */}
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31"> Remember me </label>
      </div>
    </div>
    <div class="col">
      {/* <!-- Simple link --> */}
      <a href="#!">Forgot password?</a>
    </div>
  </div>  

  {/* <!-- Submit button --> */}
  <button type="button" class="btn btn-success btn-block mb-4" onClick={handleSubmit}>LOGIN</button>

  {/* <!-- Register buttons --> */}
  <div className="text-center">
    <a onClick={() => navigate("/signup")} role="button">dont have account?</a>
    <p className="error">{inputs.message}</p>    
  </div>
</form>
</div>


<div className="col-md-6">          
            <figure>
              <img src={ring}  class="img-fluid" alt="Responsive image" width='300px' />
            </figure>          
          </div>
</div>  
</div>
    
    </section>
  );
}

export default Login;
