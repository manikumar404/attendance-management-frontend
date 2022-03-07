import React from 'react'
import './MyClass.css'
import { useSelector, useDispatch } from 'react-redux';
import {selectCurrentClass,putAttendance,takeAttendance} from '../../slices/dataSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddStudent from '../../components/AddStudent/AddStudent';
import Header from '../../components/Header/Header';
import axios from 'axios'
import {
    faFilePowerpoint,
    faTimes,
  } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';


function MyClass() {
    const currentClass = useSelector(selectCurrentClass);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const putPresent =(id_,index)=>{
      dispatch(putAttendance({index:index,status:'P'}))
    
      
    
    }
    const putAbsent=(id_,index)=>{
      dispatch(putAttendance({index:index,status:'A'}))
    
      
    }
    const allRecord =()=>{
      navigate('/all-attendance')

    }
    const save = ()=>{
      const attendanceData ={
        id:currentClass._id,
        attendance:[]
      }
      for(var i=0;i<currentClass.students.length;i++){
        attendanceData.attendance.push({serial:i,status:currentClass.students[i].currentAttendance})
      
      }
      console.log(attendanceData)
      axios.post('http://localhost:3001/tutors/take-attendance',attendanceData)
    .then(res => {
      console.log(res)

      dispatch(takeAttendance(res.data))
     
       navigate('/all-attendance')

    } )
    .catch(err => console.log(err.response))

    
     
      

    }
  return (
    <div>
    <Header/>
    <br/>
    <div className='box-nav d-flex margin-20 justify-between'>
    <AddStudent  className='in-line' id={currentClass._id} /> 
    <button className='btn in-line' onClick={allRecord}>All Record</button>
    <button className='btn in-line' onClick={save}>Save</button>
    </div>
    <br/>
        <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>@Email</th>
            <th>Gender</th>
            <th>Attendance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentClass.students.map((student, index) => (
            <tr key = {student._id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.gender}</td>
              <td id={student._id || 'default'} className ={currentClass.students[index].currentAttendance} >
              {currentClass.students[index].currentAttendance}
              </td>
              <td>
                <a onClick = {()=>putPresent(student._id,index)}
                  title="put student present"
                  className="btn border-shadow update"
                >
                  <span title="put student present" className="text-gradient">
                    <FontAwesomeIcon icon={faFilePowerpoint} />
                  </span>
                </a>
                <a
                onClick={()=>putAbsent(student._id,index)}
                  title="put student absent"
                  className="btn border-shadow delete"
                >
                  <span title="put student absent" className="text-gradient">
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </a>
              </td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  )
}

export default MyClass