import React from "react";
import { useState } from "react";
import { updateUserDetail, updatePassword } from "../request";
import { useDispatch, useSelector } from "react-redux";
import { user, updateUser } from "../../slices/dataSlice";

function ProfileEdit() {
  const dispatch = useDispatch();
  const { name, email, department, gender, _id } = useSelector(user);

  const [inputs, setInputs] = useState({
    name,
    email,
    department,
    gender,
    success: "",
    error: "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const passwordFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPasswords((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputs({ ...inputs, success:'Updating ...' })
    updateUserDetail(inputs, _id)
      .then((res) => {
        setInputs({ ...inputs, success:'Updated Successfully!' ,error:''})
        dispatch(updateUser(res.data));
      })
      .catch((err) => setInputs({ ...inputs, error: err.response?.data }));
  };

  const handleSubmitPasswords = (event) => {
    event.preventDefault();
    if (passwords.oldPassword === passwords.newPassword) {
      updatePassword(passwords, _id)
        .then((res) => console.log(res.data))
        .catch((err) => setInputs({ ...inputs, error1: err.response?.data }));
    } else {
      setInputs({ ...inputs, error1: "passwords did not match" });
    }

    //
    console.log(passwords);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-2 col-lg-3"></div>
        <div className="col col-md-8 col-lg-6">
          <div className="p-2 border border-1 rounded border-success">
            <form className="fmp" onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={inputs.name || ""}
                  onChange={handleChange}
                />
              </div>

              <div className=" mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                />
              </div>

              <div className=" mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="department"
                  value={inputs.department || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mb-3 ">
                <input
                  className="float-left"
                  type="radio"
                  value="Male"
                  name="gender"
                  checked={inputs.gender === "Male"}
                  onChange={handleChange}
                />
                Male
                <input
                  className="float-right"
                  type="radio"
                  value="Female"
                  name="gender"
                  checked={inputs.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </div>
              {inputs.error?.length > 0 && (
                <div className="alert alert-danger my-2">{inputs.error}</div>
              )}
              {inputs.success.length > 0 && (
                <div className="alert alert-success my-2">{inputs.success}</div>
              )}
              <button className="btn btn-success mb-3" type="submit">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-2 col-lg-3"></div>
      </div>

      {/* <div className="profilecard">
        <form className="fmp" onSubmit={handleSubmitPasswords}>
          <p>{inputs.error1}</p>

          <input
            className="mpbox"
            type="password"
            name="oldPassword"
            value={passwords.oldPassword || ""}
            onChange={passwordFormChange}
          />

          <input
            className="mpbox"
            type="password"
            name="newPassword"
            value={passwords.newPassword || ""}
            onChange={passwordFormChange}
          />

          <input className="mpbtn" type="submit" />
        </form>
      </div> */}
    </div>
  );
}

export default ProfileEdit;
