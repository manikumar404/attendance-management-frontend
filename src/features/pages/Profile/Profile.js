import React from "react";
import { useState } from "react";
import { updateUserDetail ,updatePassword} from "../request";
import { useDispatch, useSelector } from "react-redux";
import { user, updateUser } from "../../slices/dataSlice";
import Header from "../../components/Header/Header";

function Profile() {
  const dispatch = useDispatch();
  const {
    name,
    email,
    id,
    gender,
    _id
  } = useSelector(user);
  const [inputs, setInputs] = useState({
    name,
    email,
    id,
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
      .catch((err) => setInputs({ ...inputs, error: err.response.data }));
  };

  const handleSubmitPasswords = (event) => {
    event.preventDefault();
    if(passwords.oldPassword === passwords.newPassword){
      updatePassword(passwords,_id).then(res=>console.log(res.data)).catch(err=>console.log(err.response.data))

    }
    else{
      console.log("password did not match")
    }

    // 
    console.log(passwords)
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <p>{inputs.error}</p>
        <label>
          {" "}
          name:
          <input
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          email:
          <input
            type="text"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          id:
          <input
            type="text"
            name="id"
            value={inputs.id || ""}
            onChange={handleChange}
          />
        </label>
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
        <p className="inline">female</p>
        <input type="submit" />
      </form>


      <br/>
      <br/>


      <form onSubmit={handleSubmitPasswords}>
        <p>{inputs.error}</p>
    
        <label>
          new password
          <input
            type="password"
            name="oldPassword"
            value={passwords.oldPassword || ""}
            onChange={passwordFormChange}
          />
        </label>
        <label>
         confirm new password
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword|| ""}
            onChange={passwordFormChange}
          />
        </label>
       
        <input type="submit" />
      </form>
    </div>
  );
}

export default Profile;
