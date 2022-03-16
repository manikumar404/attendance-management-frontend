import React from "react";
import { useState } from "react";
import { getAllStudents, 
  getAllTutors, 
  getAllClasses,
  axiosDeleteClass,
  axiosDeleteUser,
  adminResetPassword

} from "../request";
import "./Admin.css";
function AdminHome() {
  const [allTutors, setAllTutors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
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
  return (
    <div className="admin">
     <ResetPassword/>
      <div className="class-block">
     

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
    adminResetPassword(inputs).then(res=>console.log(res))
 
  
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter student email:
      <input 
        type="text" 
        name="email" 
        value={email || ""} 
        onChange={changeEmail}
      />
      </label>
      <label>new password:
      <input 
        type="text" 
        name="newPassword" 
        value={newPassword || ""} 
        onChange={changePassword}
      />
      </label>
      <button className="text-gradient border-shadow" type = "submit">Reset password</button>
        
    </form>
  )
}
export default AdminHome;