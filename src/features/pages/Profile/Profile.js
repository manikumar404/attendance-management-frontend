import React from "react";
import { useState } from "react";
import { updateUserDetail,updatePassword} from "../request";
import { useDispatch, useSelector } from "react-redux";
import { user, updateUser} from "../../slices/dataSlice";
import Header from "../../components/Header/Header";
import {  Modal} from 'react-bootstrap';




import ProfileEdit from './ProfileEdit'

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
  const [show,setShow]=useState({profile:'invisible',popup:false,error:'',success:''})
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const passwordFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPasswords((values) => ({ ...values, [name]: value }));
  };


  const handleSubmitPasswords = (event) => {
    event.preventDefault();
    setShow({...show,error:'',success:'Updating password ...'})
    if (passwords.oldPassword === passwords.newPassword) {
      updatePassword(passwords, _id)
        .then((res) => setShow({...show,error:'',success:'Password updated successfully!'}))
        .catch((err) => setShow({...show,error:err.res?.data || "Invalid Input!",success:''}));
    } else {
      setShow({...show,error:'Password did not match!',success:''})
    }

   
  };
  

 
  const handleClose =()=>{
    setShow({...show,popup:false,success:'',error:''})

  }
  

  return (
    
    <div >
      <Header /><br/>     

     
<div className="row">
  <div className="col col-md-2 col-lg-3">

  </div>
  <div className="col col-md-8 col-lg-6">
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
      <button className="btn btn-outline-success" onClick={()=>{

      show.profile === 'invisible' && setShow({...show,profile:'visible'})
      show.profile === 'visible' && setShow({...show,profile:'invisible'})
      
      
      }}>Edit Profile</button>
      <button className="btn btn-outline-danger" onClick={()=>setShow({...show,popup:true})}>Change Password</button>

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
<div className={show.profile}>
<ProfileEdit/>

</div>


<Modal show={show.popup} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form className='Acard' onSubmit={handleSubmitPasswords}>
               
                <form>
                <div className="form-group">
                 
                  <input 
                className='form-control mb-3'
                  type="password" 
                  name="oldPassword" 
                  placeholder='Enter password'
                  value={passwords.oldPassword } 
                  onChange={passwordFormChange}
                />
                </div>
                <div className="form-group">
                
                  <input 
                  className='form-control mb-3'
                  type="password" 
                  name="newPassword" 
                  placeholder='Confirm password'
                  value={passwords.newPassword} 
                  onChange={passwordFormChange}
                />
             </div>{
             show.error.length>0&& <div className="alert alert-danger my-2">{show.error}</div>

             }
             {
             show.success.length>0&& <div className="alert alert-success my-2">{show.success}</div>

             }
             
             </form><br/>
             <button variant="outline-success " className='btn btn-outline-success' type="btn" onSubmit={handleSubmitPasswords} >submit</button>
             </form>
              </Modal.Body>
              <Modal.Footer>
               
                {/* <Button variant="success" onClick={handleClose}>
                  Save Changes
                </Button> */}
              </Modal.Footer>
            </Modal>


</div>



  );
}

export default Profile;