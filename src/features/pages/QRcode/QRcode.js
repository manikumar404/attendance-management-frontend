import React, { useState } from 'react'
import Header from '../../components/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import {selectCurrentClass,user} from '../../slices/dataSlice'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeClassProperty } from '../request';

function QRcode() {
    const currentClass = useSelector(selectCurrentClass)
    const navigate = useNavigate()
    const [state,setState] = useState({enable:'',disable:''})
    
    const authUser = useSelector(user)
    const disableAttendanceFromApp=()=>{
      setState({disable:'',enable:"Disabling ..."})
    
      
     changeClassProperty(false,authUser._id,currentClass.moduleId).then(res =>setState({disable:'QR code is disabled',enable:""})).catch(err => console.lgo(err.response))
    
    }
    const enableAttendanceFromApp= ()=>{
     
      setState({disable:'',enable:"Enabling ..."})
      changeClassProperty(true,authUser._id,currentClass.moduleId).then(res =>  setState({disable:'',enable:"QR code is enabled"})).catch(err => console.lgo(err.response))
    }
    const refreshAttendanceFromApp= ()=>{
     
      setState({disable:'',enable:"Refreshing ..."})
      changeClassProperty(false,authUser._id,currentClass.moduleId).then(res =>  setState({disable:'',enable:""})).catch(err => console.lgo(err.response))
    }

  return (
    <div>
    <Header>

    {/* {
          <div className="header_options" onClick = {()=>navigate('/')}>
            <span className="opt1">{authUser.name}</span>
            <span className="opt2">sign out</span>
          </div>
        } */}
    </Header>
    <div className="row mt-5">
    <div className="d-flex justify-content-center">
    <div class="btn-group">
    <button className='btn btn-danger' onClick={disableAttendanceFromApp}>Disable App Attendance</button>
    
    <button className ="btn btn-success" onClick={enableAttendanceFromApp}>Enable App Attendance</button>
    <RefreshButton refresh = {refreshAttendanceFromApp}/>


  
</div>


    </div>
   
    </div>
    <div className="row">
      <div className='d-flex justify-content-center'>
      {
            state.disable.length>0&& <div className="alert alert-danger my-2">{state.disable}</div>
             
             }
             {
             state.enable.length>0&& <div className="alert alert-success my-2">{state.enable}</div>
             
             }
      </div>
    </div>
    <div className = "row">
    <div className='d-flex justify-content-center'>
   
    <div className="mt-3">
      <img src={`https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${currentClass.moduleId}---${Math.floor(Math.random() * 1000)}`}/>

      </div>

    </div>


    </div>

    
    
    </div>
  )
}

export default QRcode

function RefreshButton(props){
  const authUser = useSelector(user)
  const currentClass = useSelector(selectCurrentClass)

  const [btnText,setBtnText] = useState(0)
  setTimeout(()=>{
    setBtnText((btnText+1)%30)

  },1000)
  if(btnText===29){
   
    changeClassProperty(false,authUser._id,currentClass.moduleId).then(res => console.log("refreshing ")).catch(err => console.lgo(err.response))

  }
  return(
    <div>
     <button className ="btn btn-info" >Refreshing in {btnText} seconds</button>

    </div>
  )
}