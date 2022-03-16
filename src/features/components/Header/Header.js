import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

function Header(props) {
  const navigate = useNavigate()
  return (
    <div className="header">
    <div className="header_logo">
      
        <h1> Logo</h1>
       
        
    </div>
    <div className="header_nav">
      
      { <div className="header_options" onClick={()=>navigate('/profile')}>
            <span className="opt1">your</span>
            <span className="opt2">Profile</span>
        </div>}
  
        {<div className="header_options">
            <span className="opt2">save changes</span>
        </div>}

        {props.children}
       { <div className="header_options">
            <span className="opt1">name</span>
            <span className="opt2">sign out</span>
        </div>
}

     
    </div>
</div> 
  )
}

export default Header