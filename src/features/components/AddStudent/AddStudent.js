import { useState } from "react";
import { addStudentPost } from "../../pages/request";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {useDispatch } from 'react-redux';
import {addStudent,selectCurrentClass} from '../../slices/dataSlice';
import './AddStudent.css';
import { useSelector } from "react-redux";


function AddStudent(props) {
  const [email, setEmail] = useState("");
  const [errors,setErrors] = useState("")
  const dispatch = useDispatch()
  const currentClass = useSelector(selectCurrentClass)
  
  const handleChange = (event) => {
    const value = event.target.value;
    setEmail(value)
  }

  const handleSubmit = (event) => {
  event.preventDefault();
    const inputs = {
      email,
      moduleId:currentClass.moduleId,
      tutorId:currentClass.tutorId
    }
    console.log(inputs)
    
    addStudentPost(inputs).then(res => {
      
        dispatch(addStudent(res.data))

    } )
    .catch(err => setErrors(err.response.data))

 
  
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className = "add-std-form">
    
      <input 
        type="text" 
        className="add-student-input"
        name="email" 
        placeholder="Enter Student Email"
        value={email || ""} 
        onChange={handleChange}
      />
   
      <button className="add-std-btn" type = "submit">Add Student<FontAwesomeIcon icon={faUser} /></button>
      <p>{errors}</p>

      </div>
        
    </form>
  )
}

export default AddStudent