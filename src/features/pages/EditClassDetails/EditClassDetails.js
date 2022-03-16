
 import React from 'react'
 import { useState } from "react";
 import { useDispatch,useSelector } from 'react-redux';
import {user,selectCurrentClass,deleteStudentFromState, setCurrentClass,} from '../../slices/dataSlice';
import Header from '../../components/Header/Header';
import { updateClass,axiosDeleteStudent,deleteClass} from '../request';
import './edit.css'

function EditClassDetails() {
   const  { className,moduleCode,credit,classStrength,_id,students}=useSelector(selectCurrentClass)

    const dispatch = useDispatch()
    const currentUser = useSelector(user)
    const [inputs, setInputs] = useState({ className,moduleCode,credit,classStrength});
    const [componentsState,setComponentsState]=useState({showStdList:true})
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs)
       
        updateClass(inputs,_id,currentUser._id).then(res => dispatch(setCurrentClass(res.data)))
        .catch(err => setInputs({...inputs,error:err.response.data}))
      
      }

      const showAllStd=()=>{
        console.log("hekllo")
     setComponentsState({...componentsState,showStdList:!componentsState.showStdList})
      }

      const deleteStd=(stdId)=>{
        axiosDeleteStudent({
          stdId,
          _id
        }).then(res =>dispatch(deleteStudentFromState(stdId))).catch(err=>console.log(err.response.data))
        
      }


  return (
    <div>
     <Header/>
    <form  onSubmit={handleSubmit}>
    <p>{inputs.error}</p>
    <label>module name:
    <input 
     
      type="text" 
      name="className" 
      value={inputs.className || ""} 
      onChange={handleChange}
    />
    </label>

    <label>module code:
    <input 
    
      type="text" 
      name="moduleCode" 
      value={inputs.moduleCode || ""} 
      onChange={handleChange}
    />
    </label>
    <label>module credit:
      <input 
     
        type="number" 
        name="credit" 
        value={inputs.credit || ""} 
        onChange={handleChange}
      />
      </label>
      <label>class strength:
      <input 
     
        type="number" 
        name="classStrength" 
        value={inputs.classStrength || ""} 
        onChange={handleChange}
      />
      </label>
      <input  type="submit" />
  </form>
  

  <div className='delete-std-btn' onClick={()=>showAllStd()}>
   remove students
  </div>
  <div className={componentsState.showStdList ? 'invisible':'default'}>
    {students.map(std=>
    <div className='students-list'>
    <p>{std.name}</p>
    <p>{std.id}</p>
    <p>{std.gender}</p>
    <p>{std.email}</p>
    <button className='delete-std-btn' onClick={()=>deleteStd(std._id)}>Delete</button>

    </div>
    
    )}
    
  </div>
  </div>
  )
}

export default EditClassDetails