import React from 'react'
import './SingleClass.css'
import { useSelector, useDispatch } from 'react-redux';
import {setCurrentClass,selectCurrentClass} from '../../slices/dataSlice';
import {useNavigate} from 'react-router-dom'
import {selectThisClass} from '../../pages/request'

function SingleClass({ index,className,moduleCode}) {
    const navigate = useNavigate()
   
    const currentClass = useSelector(selectCurrentClass)
    const dispatch = useDispatch()

    const selectThis = (moduleCode)=>{
        selectThisClass(moduleCode).then(res=> {
            console.log(res.data)
            dispatch(setCurrentClass(res.data))

        }
            ).then(res=> navigate('/MyClass'))
       
       
      
       

       
    }

    

  return (
    <div className = "class-container" onClick = {()=>selectThis(moduleCode)}>
        <div>
            <h2>{className}</h2>
        </div>
        <div>
            <p>Moudle code {moduleCode}</p>
        </div>
       
    </div>
  )
}

export default SingleClass