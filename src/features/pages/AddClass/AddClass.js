import './AddClass.css'
import styles from '../../counter/Counter.module.css';
 import React from 'react'
 import { useState } from "react";
 import axios from "axios";
 import { useDispatch,useSelector } from 'react-redux';
import {addClass,user} from '../../slices/dataSlice';
import Header from '../../components/Header/Header';

 function AddClass() {
    const dispatch = useDispatch()
    const currentUser = useSelector(user)
    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/tutors/add-class',{
          className:inputs.className,
          moduleCode:inputs.moduleCode,
          tutor:currentUser._id,
          credit:inputs.credit,
          classStrength:inputs.classStrength
        })
        .then(res => dispatch(addClass(res.data)))
        .catch(err => console.Console.log(err))
      
      }

   return (
     <div>
     <Header/>
    <form  onSubmit={handleSubmit}>
    <label>Enter module name:
    <input 
      className={styles.textbox}
      type="text" 
      name="className" 
      value={inputs.className || ""} 
      onChange={handleChange}
    />
    </label>

    <label>Enter module code:
    <input 
    className={styles.textbox}
      type="text" 
      name="moduleCode" 
      value={inputs.moduleCode || ""} 
      onChange={handleChange}
    />
    </label>
    <label>Enter module credit:
      <input 
      className={styles.textbox}
        type="number" 
        name="credit" 
        value={inputs.credit || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter class strength:
      <input 
      className={styles.textbox}
        type="number" 
        name="classStrength" 
        value={inputs.classStrength || ""} 
        onChange={handleChange}
      />
      </label>
      <input className={styles.button} type="submit" />
  </form>
  </div>
   )
 }
 
 export default AddClass