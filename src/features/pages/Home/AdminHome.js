import React from "react";
import { useState } from "react";
import {
  getAllStudents,
  getAllTutors,
  getAllClasses,
  axiosDeleteClass,
  axiosDeleteUser,
  adminResetPassword,
  getAllTokens,
  createTutorsToken,
  createStudentsToken,
  deleteAllTokens,
} from "../request";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import { user } from "../../slices/dataSlice";
import { useNavigate } from "react-router-dom";
import { Button, Modal} from "react-bootstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import pas from "../../../assets/editpass.png";
import del from "../../../assets/delete.png";
import up from "../../../assets/update.png";
function AdminHome() {
  const [allTutors, setAllTutors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allTokens, setAllTokens] = useState([]);
  const [resetPassword, setResetPassword] = useState({password:'',email:'',error:'',show:false,success:''})
  const [studentToken,setStudentToken] = useState({token:'',error:'',show:false,success:''})
  const [tutorToken,setTutorToken] = useState({token:'',error:'',show:false,success:''})
  const authUser = useSelector(user);
  const navigate = useNavigate();
  const fetchClasses = () => {
    getAllClasses("admin").then((res) => {
      setClasses(res.data);
    });
  };
  const fetchTutors = () => {
    getAllTutors("admin").then((res) => {
      setAllTutors(res.data);
    });
  };
  const fetchStudents = () => {
    getAllStudents("admin").then((res) => {
      setAllStudents(res.data);
    });
  };
  const deleteClass = (id) => {
    console.log(id);
    axiosDeleteClass(id).then((res) => {
      setClasses([...classes.filter((clas) => clas._id !== id)]);
    });
  };
  const deleteStudent = (id) => {
    axiosDeleteUser(id).then((res) => {
      setAllStudents([...allStudents.filter((student) => student._id !== id)]);
    });
  };
  const deleteTutor = (id) => {
    axiosDeleteUser(id).then((res) => {
      setAllTutors([...allTutors.filter((tutor) => tutor._id !== id)]);
    });
  };
  const fetchAllTokens = () => {
    getAllTokens()
      .then((res) => setAllTokens(res.data))
      .catch((err) => console.log(err.response?.data));
  };
  const deleteTokens = () => {
    deleteAllTokens()
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setResetPassword({...resetPassword,success:'Resetting ...',error:''})
    const inputs = {
      email:resetPassword.email,
      newPassword:resetPassword.password
    };
    adminResetPassword(inputs).then((res) => setResetPassword({...resetPassword,success:'Password Reset successful!',error:''})).catch(err=>setResetPassword({...resetPassword,error:err?.response.data,success:''}));
  };
  const handleSubmitToken = (event) => {
    event.preventDefault();
    setStudentToken({...studentToken,success:'Updating ....',error:''})

    createStudentsToken(studentToken.token)
      .then((res) => setStudentToken({...studentToken,success:'Token Updated Successfully!',error:''}))
      .catch((err) => setStudentToken({...studentToken,error:'Some error occured!',success:''}));
  };
  const handleSubmitTutorsToken = (event) => {
    event.preventDefault();
    setTutorToken({...tutorToken,success:'Updating ....',error:''})

    createTutorsToken(tutorToken.token)
      .then((res) => setTutorToken({...tutorToken,success:'Token Updated Successfully!',error:''}))
      .catch((err) => setTutorToken({...tutorToken,error:'Some error occured!',success:''}));
  };
  return (
    <div className="admin">
      <Header>
        {/* {
          <div className="header_options" onClick={() => navigate("/")}>
            <span className="opt1">{authUser.name}</span>
            <span className="opt2">sign out</span>
          </div>
        } */}
      </Header>
<div className="row p-5">
  <div className="col-md-4">
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={pas}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">         
          <button type="button" className="btn btn-outline-success" onClick={()=>setResetPassword({...resetPassword,show:true})} >Password Recovery</button>
          </Typography>      
        </CardContent>
      </CardActionArea>
    </Card><br/>
    </div>
    <div className="col-md-4">
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={up}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          <button type="button" className="btn btn-outline-success" onClick={()=>setStudentToken({...studentToken,show:true})}>Create Students Token</button>
          </Typography>         
        </CardContent>
      </CardActionArea>
    </Card><br/>
    </div>
    <div className="col-md-4">
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={up}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          <button type="button" className="btn btn-outline-success "  onClick={()=>setTutorToken({...tutorToken,show:true})}>Create Tutors Token</button>
          </Typography>          
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
    </div>
      <button type="button" className="btn btn-outline-primary" onClick={()=>setResetPassword({...resetPassword,show:true})} >Password Recovery</button>
    {/* <ResetPassword /> */}
      <br />
      <button type="button" className="btn btn-outline-primary" onClick={()=>setStudentToken({...studentToken,show:true})}>Create Students Token</button>
      {/* <CreateStudentsToken /> */}
      <br />
      <button type="button" className="btn btn-outline-primary" onClick={()=>setTutorToken({...tutorToken,show:true})}>Create Tutors Token</button>
      {/* <CreateTutorsToken /> */}
      <br />


      <Modal show={resetPassword.show} onHide={()=>setResetPassword({...resetPassword,show:false,error:'',success:''})}>
              <Modal.Header closeButton>
                <Modal.Title>Password Recovery</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form className='Acard' onSubmit={handleSubmit}>
               
              
                <div className="form-group">
                 
                  <input 
                className='form-control my-4'
                  type="text" 
                  name="email" 
                  placeholder='Email'
                  value={resetPassword.email} 
                  onChange={(e)=>setResetPassword({...resetPassword,email:e.target.value})}
                />
                </div>
                <div className="form-group">
                 
                  <input 
                  className='form-control'
                  type="password" 
                  name="password" 
                  placeholder='New Password'
                  value={resetPassword.password} 
                  onChange={(e)=>setResetPassword({...resetPassword,password:e.target.value})}
                />
             </div>{
             resetPassword.error.length>0&& <div className="alert alert-danger my-2">{resetPassword.error}</div>
             
             }
             {
             resetPassword.success.length>0&& <div className="alert alert-success my-2">{resetPassword.success}</div>
             
             }
             
           <br/>
             <button variant="outline-success " className='btn btn-outline-success' type="btn" onSubmit={handleSubmit} >submit</button>
             </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=>setResetPassword({...resetPassword,show:false,error:'',success:''})}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>



            <Modal show={studentToken.show} onHide={()=>setStudentToken({...studentToken,show:false})}>
              <Modal.Header closeButton>
                <Modal.Title>Reset Students Token</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form className='Acard' onSubmit={handleSubmitToken}>
               
                
                <div className="form-group">
                 
                  <input 
                className='form-control my-4'
                  type="text" 
                  name="token" 
                  placeholder='Students Token'
                  value={setStudentToken.token} 
                  onChange={(e)=>setStudentToken({...studentToken,token:e.target.value})}
                />
                </div>
                {
             studentToken.error.length>0&& <div className="alert alert-danger my-2">{studentToken.error}</div>
             
             }
             {
             studentToken.success.length>0&& <div className="alert alert-success my-2">{studentToken.success}</div>
             
             }
               
             
         
            
             <br/>
             <button variant="outline-success " className='btn btn-outline-success' type="btn" onSubmit={handleSubmitToken} >submit</button>
             </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=>setStudentToken({...studentToken,show:false})}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>



            <Modal show={tutorToken.show} onHide={()=>setTutorToken({...tutorToken,show:false})}>
              <Modal.Header closeButton>
                <Modal.Title>Reset Tutors Token</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form className='Acard' onSubmit={handleSubmitTutorsToken}>
               
             
                <div className="form-group">
                 
                  <input 
                className='form-control my-4'
                  type="text" 
                  name="token" 
                  placeholder='Students Token'
                  value={tutorToken.token} 
                  onChange={(e)=>setTutorToken({...tutorToken,token:e.target.value})}
                />
                </div>
                <div className="form-group">
                 
                 
             </div>
             
            
             {
             tutorToken.error.length>0&& <div className="alert alert-danger my-2">{tutorToken.error}</div>
             
             }
             {
             tutorToken.success.length>0&& <div className="alert alert-success my-2">{tutorToken.success}</div>
             
             }
             <br/>
             <button variant="outline-success " className='btn btn-outline-success' type="btn" onSubmit={handleSubmitTutorsToken} >submit</button>
             </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=>setTutorToken({...tutorToken,show:false})}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>









      <div className="amcard">
        <div className="drop-down" onClick={fetchAllTokens}>
          All tokens
          <div className="card">
            <img src="" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Delete All Tokens</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
        <div>
          {allTokens.map((token) => (
            <div className="single-item">
              <p>{token.propertyName}</p>
              <p>{token.value}</p>
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="amcard">
        <div className="drop-down" onClick={deleteTokens}>
          delete all tokens
        </div>
      </div>

      <div className="amcard">
        <div className="drop-down" onClick={fetchClasses}>
          All classes
        </div>
        <div>
          {classes.map((cls) => (
            <div className="single-item">
              <p>{cls.className}</p>
              <p>{cls.moduleCode}</p>
              <p>{cls.createdAt}</p>
              <button
                className="btn-delete"
                onClick={() => deleteClass(cls._id)}
              >
                {" "}
                Delete{" "}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="tutor-block">
        <div className="drop-down" onClick={fetchTutors}>
          All Tutors
        </div>
        <div>
          {allTutors.map((item) => (
            <div className="single-item">
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.gender}</p>
              <button
                className="btn-delete"
                onClick={() => deleteTutor(item._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="student-block">
        <div className="drop-down" onClick={fetchStudents}>
          All Students
        </div>
        <div>
          {allStudents.map((item) => (
            <div className="single-item">
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.gender}</p>
              <button
                className="btn-delete"
                onClick={() => deleteStudent(item._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResetPassword(props) {
  const [email, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");

  const changeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const changePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputs = {
      email,
      newPassword,
    };
    adminResetPassword(inputs).then((res) => console.log(res.data));
  };

  return (
    <div>
      <form className="add-std-for" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Enter Email"
          className="add-student-inpu"
          value={email || ""}
          onChange={changeEmail}
        />

        <input
          type="text"
          name="newPassword"
          className="add-student-inpu"
          placeholder="Enter New Password"
          value={newPassword || ""}
          onChange={changePassword}
        />

        <button className="add-std-bt" type="submit">
          Reset password
        </button>
      </form>
    </div>
  );
}
function CreateTutorsToken(props) {
  const [token, setToken] = useState("");

  const changeToken = (event) => {
    const value = event.target.value;
    setToken(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createTutorsToken(token)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <form className="add-std-for" onSubmit={handleSubmit}>
        <input
          type="text"
          name="token"
          placeholder="Enter token for tutor"
          className="add-student-inpu"
          value={token || ""}
          onChange={changeToken}
        />

        <button className="add-std-bt" type="submit">
          update tutors token
        </button>
      </form>
    </div>
  );
}

function CreateStudentsToken(props) {
  const [token, setToken] = useState("");

  const changeToken = (event) => {
    const value = event.target.value;
    setToken(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createStudentsToken(token)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <form className="add-std-for" onSubmit={handleSubmit}>
        <input
          type="text"
          name="token"
          placeholder="Enter token for students"
          className="add-student-inpu"
          value={token || ""}
          onChange={changeToken}
        />

        <button className="add-std-bt" type="submit">
          update students token
        </button>
      </form>
    </div>
  );
}

export default AdminHome;
