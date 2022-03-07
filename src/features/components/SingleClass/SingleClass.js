import React from 'react'
import './SingleClass.css'
import { useSelector, useDispatch } from 'react-redux';
import {selectClasses,setCurrentClass,selectCurrentClass} from '../../slices/dataSlice';
import {useNavigate} from 'react-router-dom'

function SingleClass({ index,className,moduleCode,classStrength,credit}) {
    const navigate = useNavigate()
    const classes = useSelector(selectClasses);
    const currentClass = useSelector(selectCurrentClass)
    const dispatch = useDispatch()

    const selectThisClass = ()=>{
        dispatch(setCurrentClass(classes[index]))
       
      
        navigate('/MyClass')

       
    }

    

  return (
    <div className = "class-container" onClick = {selectThisClass}>
        <div>
            <h2>{className}</h2>
        </div>
        <div>
            <p>Moudle code {moduleCode}</p>
        </div>
        <div>
            <p>Class Strength  {classStrength}</p>
        </div>
        <div>
            <p>Credit  {credit}</p>
        </div>
    </div>
  )
}

export default SingleClass