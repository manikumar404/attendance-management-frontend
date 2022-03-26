import React from "react";
import { useState } from "react";
import { updateUserDetail ,updatePassword} from "../request";
import { useDispatch, useSelector } from "react-redux";
import { user, updateUser } from "../../slices/dataSlice";
import Header from "../../components/Header/Header";
import './Profile.css'

function Profile() {
  const dispatch = useDispatch();
  const {
    name,
    email,
    department,
    gender,
    _id
  } = useSelector(user);
  const [inputs, setInputs] = useState({
    name,
    email,
    department,
    gender,
  });

  const [passwords,setPasswords] = useState({
    oldPassword:'',
    newPassword:''
  })
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
    updateUserDetail(inputs, _id)
      .then((res) => dispatch(updateUser(res.data)))
      .catch((err) => setInputs({ ...inputs, error: err.response?.data }));
  };

  const handleSubmitPasswords = (event) => {
    event.preventDefault();
    if(passwords.oldPassword === passwords.newPassword){
      updatePassword(passwords,_id).then(res=>console.log(res.data)).catch(err=>setInputs({ ...inputs, error1: err.response?.data }))

    }
    else{
      setInputs({ ...inputs, error1: "passwords did not match" })
    }

    // 
    console.log(passwords)
  };

  return (
    <div >
      <Header />
      <div className="profilecard">
      <h2 className='Edit-text'>My Profile <hr/></h2>
      <form className='fmp' onSubmit={handleSubmit}>
        <p>{inputs.error}</p>
        <label>
          {" "}
          Name:
          <input
            className="mpbox"
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
          />
        </label><br/>
        <label>
          Email:
          <input
          className="mpbox"
            type="text"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
        </label><br/>
        <label>
          Department:
          <input
          className="mpbox"
            type="text"
            name="department"
            value={inputs.department || ""}
            onChange={handleChange}
          />
        </label><br/>
       
        Gender
        <input
          className="inline"
          type="radio"
          value="Male"
          name="gender"
          checked={inputs.gender === "Male"}
          onChange={handleChange}
        />
        <p className="inline">male</p>
        <input
          className="inline-block"
          type="radio"
          value="Female"
          name="gender"
          checked={inputs.gender === "Female"}
          onChange={handleChange}
        />
        <p className="inline">female</p><br/>
        <input className="mpbtn" type="submit" />
      </form>
      <br/>
      <hr/><br/>
      
      <form className='fmp' onSubmit={handleSubmitPasswords}>
        <p>{inputs.error1}</p>
    
        <label>
          New Password:
          <input
          className="mpbox"
            type="password"
            name="oldPassword"
            value={passwords.oldPassword || ""}
            onChange={passwordFormChange}
          />
        </label><br/>
        <label>
         Confirm New Password:
          <input
          className="mpbox"
            type="password"
            name="newPassword"
            value={passwords.newPassword|| ""}
            onChange={passwordFormChange}
          />
        </label><br/>
       
        <input className="mpbtn" type="submit" />
      </form>
      </div>
    </div>
  );
}

export default Profile;