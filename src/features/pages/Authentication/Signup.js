import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../request";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/dataSlice";
import logo from "../../../assets/logo.png";
// import bg from "../../../assets/bg.svg";
//import wave from "../../../assets/wave.png";
import ring from "../../../assets/login.png";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ gender: "Male" ,password:""});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs.gender);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.password === inputs.password2) {
      signUp(inputs)
        .then((res) => {
          if (res.status === 200) {
            dispatch(setUser(res.data));
            navigate("/");
          } else {
            console.log(res);
          }
        })
        .catch((err) =>
          //console.log(err.response.data)
          setInputs({ ...inputs, message: err.response.data })
        );
    }
  };
  return (
    <section className="login">
      <div className="container mt-5">
        <div className="row ">
          <div className="col-md-6">
            <div className="card ">
              <div className="card-body m-4">
                <div className="row">
                  <div className="col-8">
                    <img src={logo} alt="background" width="50px" />
                  </div>
                  <div className="col-4">
                    <h5 class="card-title text-success">SIGN IN</h5>
                  </div>
                </div>
                <hr />

                <form>
                  <div className="form-group mt-4">
                    <input
                      className="form-control"
                      type="text"
                      name="token"
                      placeholder="Token"
                      value={inputs.token}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      value={inputs.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={inputs.email}
                      onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group mt-4">
                    <input
                      className="form-control"
                      type="text"
                      name="department"
                      value={inputs.department}
                      placeholder="Groupa Id"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mt-4">
                    <label>Gender</label>
                    <br />
                    <input
                      className="inline"
                      type="radio"
                      id="radio-2"
                      value="Male"
                      name="gender"
                      // checked={inputs.gender === "Male"}
                      // onChange={handleChange}
                    />
                    <label className="radio-label">Male</label>
                  </div>
                  <div className="radio inline ">
                    <input
                      className="inline"
                      type="radio"
                      id="radio-2"
                      value="Female"
                      name="gender"
                      // checked={inputs.gender === "Female"}
                      // onChange={handleChange}
                    />
                    <label className="radio-label">Female</label>
                  </div>

                  <div className="form-group mt-4">
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
                  </div>
                  <div className="form-group mt-4">
                    <input
                      className={
                        inputs.password.length> 7
                          ? "is-valid form-control"
                          : "is-invalid form-control"
                      }
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={inputs.password1}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <input
                      type="Password"
                      className={
                        inputs.password === inputs.password2
                          ? "is-valid form-control"
                          : "is-invalid form-control"
                      }
                      name="password2"
                      placeholder="confirm password"
                      value={inputs.password2}
                      onChange={handleChange}
                    />
                  </div>
                  <a className ="text-primary" role="button" onClick={() => navigate("/")}>
                    already have an account?
                  </a>
                  {
                    inputs?.message?.length>0 && <div className="alert alert-danger">{inputs.message}</div>
                  }
                 
                  <br />
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={handleSubmit}
                  >
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <figure>
              <img
                src={ring}
                class="img-fluid"
                alt="Responsive image"
                width=""
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
