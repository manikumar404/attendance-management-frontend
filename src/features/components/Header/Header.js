import React, { useEffect } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import { useSelector } from 'react-redux'
import { user } from '../../slices/dataSlice'

function Header(props) {
  const authUser = useSelector(user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!authUser._id){
      console.log("hello no auth user")
      navigate('/')

    }
   
  })
  return (
    <div className="header">
    <div className="header_logo">
      
    <a className='logo' href=''><img src={logo} alt="logo" width="50px" /></a><br/>
       
        
    </div>
    <div className="header_nav">
      
      { <div className="header_options" onClick={()=>navigate('/profile')}>
            <span className="opt1">Your</span>
            <span className="opt2">Profile</span>
        </div>}
  
       

        {props.children}
       

     
    </div>
</div> 
  )
}

export default Header