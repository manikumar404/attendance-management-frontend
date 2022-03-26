import React from "react";
import { useState } from "react";
import { getAllStudents, 
  getAllTutors, 
  getAllClasses,
  axiosDeleteClass,
  axiosDeleteUser,
  adminResetPassword,
  getAllTokens,
  createTutorsToken,
  createStudentsToken,
  deleteAllTokens

} from "../request";
import "./Admin.css";
import Header from '../../components/Header/Header';
import { useSelector} from "react-redux";
import {  user } from "../../slices/dataSlice";
import { useNavigate } from "react-router-dom";
function AdminHome() {
  const [allTutors, setAllTutors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allTokens,setAllTokens] = useState([])
  const authUser = useSelector(user)
  const navigate = useNavigate()
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
  const deleteClass=(id)=>{
    console.log(id)
    axiosDeleteClass(id).then((res)=>{
      setClasses([...classes.filter(clas=>clas._id!==id)])
    })


  }
  const deleteStudent=(id)=>{
    axiosDeleteUser(id).then((res)=>{
      setAllStudents([...allStudents.filter(student=>student._id!==id)])
    })
  

  }
  const deleteTutor=(id)=>{
    axiosDeleteUser(id).then((res)=>{
      setAllTutors([...allTutors.filter(tutor=>tutor._id!==id)])
    })  

  }
  const fetchAllTokens =()=>{
    getAllTokens().then(res => setAllTokens(res.data)).catch(err=>console.log(err.response?.data))
  }
  const deleteTokens=()=>{
    deleteAllTokens().then(res => console.log(res.data)).catch(err => console.log(err.response))
  }
  return (
    <div className="admin">
      <Header>
      {
          <div className="header_options" onClick={()=>navigate('/')}>
            <span className="opt1">{authUser.name}</span>
            <span className="opt2">sign out</span>
          </div>
        }
      </Header>
     <ResetPassword/>
     <br/>
     <CreateStudentsToken/>
     <br/>
     <CreateTutorsToken/>
     <br/>
     <div className="amcard">
        <div className="drop-down" onClick={fetchAllTokens}>
          All tokens
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
      <br/>
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
              <button className="btn-delete" onClick={()=>deleteClass(cls._id)} > Delete </button>
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
              <button className="btn-delete" onClick={()=>deleteTutor(item._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <div className="student-block">
        <div className="drop-down" onClick={fetchStudents}>
          All Students
        </div>
        <div >
          {allStudents.map((item) => (
            <div className="single-item">
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.gender}</p>
              <button className="btn-delete" onClick={()=>deleteStudent(item._id)}>Delete</button>
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
    setEmail(value)
  }

  const changePassword = (event) => {
    const value = event.target.value;
    setPassword(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputs = {
      email,
      newPassword
    }
    adminResetPassword(inputs).then(res=>console.log(res.data))
 
  
  }

  return (
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
     
      <button className="add-std-bt" type = "submit">Reset password</button>
        
    </form>
  )
}
function CreateTutorsToken(props) {
  const [token,setToken] = useState("");
  
 
  
  const changeToken = (event) => {
    const value = event.target.value;
    setToken(value)
  }

  

  const handleSubmit = (event) => {
    event.preventDefault();
  
   createTutorsToken(token).then(res=>console.log(res.data)).catch(err => console.log(err.response))
 
  
  }

  return (
    <form className="add-std-for" onSubmit={handleSubmit}>
     
      <input 
        type="text" 
        name="token" 
        placeholder="Enter token for tutor"
        className="add-student-inpu"
        value={token || ""} 
        onChange={changeToken}
      />
    
      <button className="add-std-bt" type = "submit">update tutors token</button>
        
    </form>
  )
}

function CreateStudentsToken(props) {
  const [token,setToken] = useState("");
  
 
  
  const changeToken = (event) => {
    const value = event.target.value;
    setToken(value)
  }

  

  const handleSubmit = (event) => {
    event.preventDefault();
  
   createStudentsToken(token).then(res=>console.log(res.data)).catch(err => console.log(err.response))
 
  
  }

  return (
    <form className="add-std-for" onSubmit={handleSubmit}>
     
      <input 
        type="text" 
        name="token" 
        placeholder="Enter token for students"
        className="add-student-inpu"
        value={token || ""} 
        onChange={changeToken}
      />
    
      <button className="add-std-bt" type = "submit">update students token</button>
        
    </form>
  )
}

export default AdminHome;
