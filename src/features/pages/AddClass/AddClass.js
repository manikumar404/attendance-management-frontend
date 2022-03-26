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
    const [inputs, setInputs] = useState({moduleName:'',moduleCode:''});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
       
        addClassPost(inputs,currentUser._id).then(res => dispatch(addClass(res.data)))
        .catch(err => setInputs({...inputs,error:err.response?.data}))
      
      }

   return (
    <div>
    <Header/>
   <form className='Acard' onSubmit={handleSubmit}>
   <h2 className='text-addcl'>Add Class</h2>
   <p>{inputs.error}</p>

   <label className='l1'><h6>Module code:</h6>
   <input 
   className='Abox'
     type="text" 
     name="moduleCode" 
     placeholder='module code'
     value={inputs.moduleCode } 
     onChange={handleChange}
   />
   </label><br/>

   <label className='l1' ><h6>Module name:</h6>
   <input 
     className='Abox'
     type="text" 
     name="moduleName" 
     placeholder='module name'
     value={inputs.moduleName} 
     onChange={handleChange}
   />
   </label><br/>

   
   <br/>
     <input className='asbtn' type="submit" />
 </form>
 </div>
   )
 }
 
 export default AddClass