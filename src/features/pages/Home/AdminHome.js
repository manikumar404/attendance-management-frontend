import React from "react";
import { useState } from "react";
import { getAllStudents, getAllTutors, getAllClasses,axiosDeleteClass,axiosDeleteUser} from "../request";
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
  const deleteClass=(moduleCode)=>{
    console.log(moduleCode)
    axiosDeleteClass(moduleCode).then((res)=>{
      setClasses([...classes.filter(clas=>clas.moduleCode!==moduleCode)])
    })


  }
  const deleteStudent=(email)=>{
    axiosDeleteUser(email).then((res)=>{
      setAllStudents([...allStudents.filter(student=>student.email!==email)])
    })
  

  }
  const deleteTutor=(email)=>{
    axiosDeleteUser(email).then((res)=>{
      setAllTutors([...allTutors.filter(tutor=>tutor.email!==email)])
    })

  }
  return (
    <div className="admin">
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
              <button className="btn-delete" onClick={()=>deleteClass(cls.moduleCode)} > Delete </button>
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
              <button className="btn-delete" onClick={()=>deleteTutor(item.email)}>Delete</button>
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
              <button className="btn-delete" onClick={()=>deleteStudent(item.email)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
