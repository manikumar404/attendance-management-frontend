import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {user,setCurrentStudentsClass} from '../../slices/dataSlice';
import './Home.css'
import {useNavigate} from 'react-router-dom'
import Header from '../../components/Header/Header';
import {reqMyAttendance} from '../request'


function StudentHome() {
   
    const authUser = useSelector(user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
      const select=(data)=>{
          reqMyAttendance(data).then((res)=>{
              console.log(data)
            dispatch(setCurrentStudentsClass(res.data))
            return navigate('/single-student')

          })
         
      }

   

  return (
    <div>
    <Header/>
    <br/>
    {authUser.moduleList.map((clas,index)=> 
    <div className='single-class-container' key={index} onClick={()=>select({moduleCode:clas.moduleCode,email:authUser.email})}>
    <h3>{clas.className}</h3>
    <p>{clas.moduleCode}</p>
        

    </div>
    )}
    </div>
  )
}

export default StudentHome