
 import React from 'react'
 import { useState } from "react";
 import { useDispatch,useSelector } from 'react-redux';
import {user,selectCurrentClass,deleteStudentFromState, setCurrentClass,} from '../../slices/dataSlice';
import Header from '../../components/Header/Header';
import { updateClass,axiosDeleteStudent,deleteClass} from '../request';
import { useNavigate } from 'react-router-dom';

function EditClassDetails() {
   const  { moduleName,moduleCode,moduleId,students,tutorId}=useSelector(selectCurrentClass)
   const navigate = useNavigate()

    const dispatch = useDispatch()
    const currentUser = useSelector(user)
    const [inputs, setInputs] = useState({ moduleName,moduleCode});
    const [componentsState,setComponentsState]=useState({showStdList:true})
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs)
       
        updateClass(inputs,moduleId,tutorId).then(res => dispatch(setCurrentClass(res.data)))
        .catch(err => setInputs({...inputs,error:err.response?.data}))
      
      }

      const showAllStd=()=>{
        console.log("hekllo")
     setComponentsState({...componentsState,showStdList:!componentsState.showStdList})
      }

      const deleteStd=(stdId)=>{
        axiosDeleteStudent({
          stdId,
          moduleId,
          tutorId
        }).then(res =>dispatch(deleteStudentFromState(stdId))).catch(err=>console.log(err.response.data))
        
      }


  return (
    <div>
    <Header>
    {
          <div className="header_options" onClick={()=>navigate('/')}>
            <span className="opt1">{currentUser.name}</span>
            <span className="opt2">sign out</span>
          </div>
        }

    </Header>
   <form className='Ecard' onSubmit={handleSubmit}>
   <h2 className='Edit-text'>Edit Class</h2>
   <p>{inputs.error}</p>
   <label className='l2'>Module Name:
   <input 
     className='Ebox'     
     type="text" 
     name="moduleName" 
     value={inputs.moduleName || ""} 
     onChange={handleChange}
   />
   </label><br/>

   <label className='l2'>Module Code:
   <input 
     className='Ebox'
     type="text" 
     name="moduleCode" 
     value={inputs.moduleCode || ""} 
     onChange={handleChange}
   />
   </label><br/>
  
  
     <input  className='ecbtn' type="submit" />
 </form>
 
<div className='RemoveCard'>
 <div className='delete-std-btn' onClick={()=>showAllStd()}>
  Remove Students
 </div>
 <div className={componentsState.showStdList ? 'invisible':'visible'}>
   {students.map(std=>
   <div className='students-list'>
   <p>{std.name}</p>
   <p>{std.id}</p>
   <p>{std.gender}</p>
   <p>{std.email}</p>
   <button className='delete-btn' onClick={()=>deleteStd(std._id)}>Delete</button>

   </div>
   
   )}
   </div>
 </div>
 </div>
  )
}

export default EditClassDetails