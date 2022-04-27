import React from "react";
import { useState } from "react";
import { updateUserDetail ,updatePassword} from "../request";
import { useDispatch, useSelector } from "react-redux";
import { user, updateUser } from "../../slices/dataSlice";
import Header from "../../components/Header/Header";
import {Card, Button} from "react-bootstrap";
function ProfileEdit() {
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

      <Card className="text-center">
  <Card.Header><b>Edit Profile</b></Card.Header>
  <Card.Body>
    <Card.Title></Card.Title>
    <Card.Text>
    <form className='fmp' onSubmit={handleSubmit}>
        <p>{inputs.error}</p>
        <div className="form-group row">
        <label className="col-sm-3 col-form-label">{" "}Name:</label>
        <div className="col-sm-9">
        <input
            className="form-control"
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
          />
          </div>
        </div><br/>        
        
        <div className="form-group row">
        <label className="col-sm-3 col-form-label">Email:</label>
        <div className="col-sm-9">
        <input
          className="form-control"
            type="text"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
          </div>
        </div><br/>


        <div className="form-group row">
        <label className="col-sm-3 col-form-label">Department:</label>
        <div className="col-sm-9">
        <input
          className="form-control"
          type="text"
          name="department"
          value={inputs.department || ""}
          onChange={handleChange}
          />
          </div>
        </div><br/>

        <div className="form-group row">
        <label className="col-sm-3 col-form-label">Gender:</label>
        <div className="col-sm-4">
        <input
          className="inline"
          type="radio"
          value="Male"
          name="gender"
          checked={inputs.gender === "Male"}
          onChange={handleChange}
        />Male
        </div>
        <div className="col-sm-5">
        <input
          className="inline-block"
          type="radio"
          value="Female"
          name="gender"
          checked={inputs.gender === "Female"}
          onChange={handleChange}
        />Female
        </div>
        </div>
      </form>
    </Card.Text>
    <Button className="mpbtn" type="submit" variant="success">SUBMIT</Button>
  </Card.Body>
  <Card.Footer className="text-muted"></Card.Footer>
</Card>


      <div className="profilecard">     
      
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

export default ProfileEdit;