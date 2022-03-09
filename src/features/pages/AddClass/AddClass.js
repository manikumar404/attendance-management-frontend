import styles from './AddClass.css'
 import React from 'react'
 import { useState } from "react";
import { addClass as addClassPost } from '../request';
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
       
        addClassPost(inputs,currentUser).then(res => dispatch(addClass(res.data)))
        .catch(err => setInputs({...inputs,error:err.response.data}))
      
      }

   return (
     <div>
     <Header/>
    <form  onSubmit={handleSubmit}>
    <p>{inputs.error}</p>
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