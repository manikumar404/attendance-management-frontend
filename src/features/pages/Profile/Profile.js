import React from "react";
import { useState } from "react";
import { updateUserDetail} from "../request";
import { useDispatch, useSelector } from "react-redux";
import { user, updateUser } from "../../slices/dataSlice";
import Header from "../../components/Header/Header";
import {Container, Row, Col, Card, Button, CardGroup} from 'react-bootstrap';
import { Link } from "react-router-dom";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserDetail(inputs, _id)
      .then((res) => dispatch(updateUser(res.data)))
      .catch((err) => setInputs({ ...inputs, error: err.response?.data }));
  }; 

  return (
    
    <div >
      <Header /><br/>     

      {/* <CardGroup>
        
  <Card >
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This card has supporting text below as a natural lead-in to additional
        content.{' '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
</CardGroup> */}
{/* 
<Card className="text-center">
  <Card.Header><b>My Profile</b></Card.Header>
  <Card.Body>
    <Card.Title></Card.Title>
    <Card.Text>
    <form className='fmp' onSubmit={handleSubmit}>
        <p>{inputs.error}</p>
        <label>          
          <p
            className="mpbox"
            type="text"
            name="name">Name: {inputs.name}</p>               
        </label><br/>
        <label>          
          <p
          className="mpbox"
            type="text"
            name="email">Email: {inputs.email}</p>
        </label><br/>
        <label>          
          <p
          className="mpbox"
            type="text"
            name="department">Department: {inputs.department}</p>
        </label>  <br/>      
        <p
          className="inline"
          type="radio"
          value="Male"
          name="gender">Gender: {inputs.gender}</p>        
         
      </form>
    </Card.Text>
    <Link to='/ProfileEdit'>
        <input className="btn btn-outline-success" type="submit" value="Edit Profile"  />
        </Link>
  </Card.Body>
  <Card.Footer className="text-muted">@attendance management system</Card.Footer>
</Card> */}
<div className="row">
  <div className="col col-md-2 col-lg-3">

  </div>
  <div className="col col-md-10 col-lg-6">
  <div className="card text-center my-2 border border-2 border-success rounded ">
    <div className="card-header alert-success" >
    <h3 className="card-text">
      {name}`s Profile
    </h3>
    
    </div>
    <div className="card-body ">
      <h5 className="card-title">Name : {name}</h5>
      <h5 className="card-title">Gender : {gender}</h5>
      <h5 className="card-title">Department : {department}</h5>
     
      <div className="btn-group">
      <button className="btn btn-outline-success" >Edit Profile</button>
      <button className="btn btn-outline-danger" >Change Password</button>

      </div>
      <div className="card-footer text-muted">
      {email}
    </div>
      
    
    </div>
   
  </div>

  </div>
  <div className="col col-md-2 col-lg-3">

  </div>

</div>

</div>



  );
}

export default Profile;