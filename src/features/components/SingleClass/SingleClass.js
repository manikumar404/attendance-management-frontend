import React from 'react'
import './SingleClass.css'
import { useSelector, useDispatch } from 'react-redux';
import {setCurrentClass,user,selectCurrentClass} from '../../slices/dataSlice';
import {useNavigate} from 'react-router-dom'
import {selectThisClass} from '../../pages/request'

function SingleClass({ index,className,moduleCode}) {
    const navigate = useNavigate()
    const currentUser = useSelector(user)
   
    const currentClass = useSelector(selectCurrentClass)
    const dispatch = useDispatch()

    const selectThis = (moduleCode)=>{
        selectThisClass(moduleCode).then(res=> {
            console.log(res.data)
            dispatch(setCurrentClass(res.data))

        }
            ).then(res=> {
                if(currentUser.userType === 'tutor'){
                    return navigate('/MyClass')

                }
                if(currentUser.userType === 'student'){
                    return navigate('/single-student')

                }

            })
       
       
      
       

       
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