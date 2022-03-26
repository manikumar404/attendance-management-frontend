import React from 'react'
import Header from '../../components/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import {selectCurrentClass,user} from '../../slices/dataSlice'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeClassProperty } from '../request';

function QRcode() {
    const currentClass = useSelector(selectCurrentClass)
    const navigate = useNavigate()
    
    const authUser = useSelector(user)
    const disableAttendanceFromApp=()=>{
      
     changeClassProperty(false,authUser._id,currentClass.moduleId).then(res => console.log(res.data)).catch(err => console.lgo(err.response))
    
    }
    const enableAttendanceFromApp= ()=>{
      changeClassProperty(true,authUser._id,currentClass.moduleId).then(res => console.log(res.data)).catch(err => console.lgo(err.response))
    }
   
  return (
    <div>
    <Header>

    {
          <div className="header_options" onClick = {()=>navigate('/')}>
            <span className="opt1">{authUser.name}</span>
            <span className="opt2">sign out</span>
          </div>
        }
    </Header>

    <button onClick={disableAttendanceFromApp}>Disable App Attendance</button>
    <br/>
    <button onClick={enableAttendanceFromApp}>Enable App Attendance</button>
    {console.log("generating")}
    <div style = {{display:'flex',marginTop:'60px'}}>
      <div style = {{margin:'auto'}}>
      <img src={`https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${currentClass.moduleId}---${Math.floor(Math.random() * 1000)}`}/>

      </div>
    </div>
   
    </div>
  )
}

export default QRcode