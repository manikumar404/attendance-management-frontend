import { useState } from "react";
import { addStudentPost } from "../../pages/request";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {useDispatch } from 'react-redux';
import {addStudent} from '../../slices/dataSlice';

function AddStudent(props) {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch()
  
  const handleChange = (event) => {
    const value = event.target.value;
    setEmail(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputs = {
      email,
      id:props.id
    }
    
    addStudentPost(inputs).then(res => {
        dispatch(addStudent(res.data))

    } )
    .catch(err => console.Console.log(err))

 
  
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter student email:
      <input 
        type="text" 
        name="email" 
        value={email || ""} 
        onChange={handleChange}
      />
      </label>
      <button className="text-gradient border-shadow" type = "submit">Add Student<FontAwesomeIcon icon={faUser} /></button>
        
    </form>
  )
}

export default AddStudent