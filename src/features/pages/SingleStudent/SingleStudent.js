import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {resetAttendance, selectCurrentClass,user} from '../../slices/dataSlice';
import './SingleStudent.css'
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { resetAttendance as axiosResetAttendance } from '../request';

function SingleStudent() {
    const currentClass = useSelector(selectCurrentClass)
    const authUser = useSelector(user)
    const dispatch = useDispatch()
    const {currentStudent} = currentClass
    const navigate = useNavigate()
    const changeAttendance = async (attendanceId,status,index)=>{
      const currentStatus = status ==='P'?'A':'P'
      try{
        const res = await axiosResetAttendance(attendanceId,currentStatus,authUser._id)
        dispatch(resetAttendance({status:res.data,index}))

      }catch(err){
        console.log(err.response)
      }
     
      
    }
  return (
      <div>
      <Header>
      {
          <div className="header_options" onClick={()=>navigate('/')}>
            <span className="opt1">{authUser?.name}</span>
            <span className="opt2">sign out</span>
          </div>
        }

      </Header>
          <div>
          <h2>{currentStudent?.name}'s Attendance</h2>
          {
            currentStudent?.attendance?.map((att,index)=>
             <div key={att._id} className='single-attendance'>
             
             <div className={att.status}>
             <p>{att.createdAt}</p>
             {
               
            att.createdAt !== att.updatedAt&&<p>{att.updatedAt}</p>
               
             }
             <p>{att.status}</p>
             </div>
            {authUser.userType === 'tutor' && <button onClick={()=>changeAttendance(att._id,att.status,index)}>change attendance</button>}
             </div>
             )


          }

          </div>
             
         


      </div>
    
  )
}

export default SingleStudent