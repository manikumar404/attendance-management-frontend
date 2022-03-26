import React from 'react'
import './SingleClass.css'
import { useSelector, useDispatch } from 'react-redux';
import {setCurrentClass,user,selectCurrentClass, deleteOneClass} from '../../slices/dataSlice';
import {useNavigate} from 'react-router-dom'
import {axiosDeleteClassTutor, selectThisClass} from '../../pages/request'

function SingleClass({ index,moduleName,moduleCode,_id}) {
    const navigate = useNavigate()
    const currentUser = useSelector(user)
   
    const currentClass = useSelector(selectCurrentClass)
    const dispatch = useDispatch()

    const selectThis = (moduleId)=>{
        selectThisClass(moduleId,currentUser._id).then(res=> {
            console.log(res.data)
            dispatch(setCurrentClass({
                moduleId:moduleId,
                tutorId:currentUser._id,
                students:res.data,
                moduleName:moduleName,
                moduleCode:moduleCode
            }))

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
    const deleteClass = (moduleId)=>{
        axiosDeleteClassTutor(moduleId,currentUser._id).then(res => dispatch(deleteOneClass(moduleId))).catch(err => console.log(err.response))
    }

    

  return (
    <div className='card'> 
    <div className = "class-container" onClick = {()=>selectThis(_id)}>
        <div>
            <h2>{moduleName}</h2>
        </div>
        <div>
            <p>Moudle code {moduleCode}</p>
        </div>
       
       
    </div>
    <button onClick={()=>deleteClass(_id)} >Delete </button>
    </div>
  )
}

export default SingleClass