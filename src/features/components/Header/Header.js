import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className="header">
    <div className="header_logo">
      
        <h1> Logo</h1>
       
        
    </div>
    <div className="header_nav">
      
      { <div className="header_options" >
            <span className="opt1">Add</span>
            <span className="opt2">Student</span>
        </div>}
   {
        <div className="header_options">
            <span className="opt1">Remove</span>
            <span className="opt2">Student</span>
        </div>}
       { <div className="header_options">
            <span className="opt1">All</span>
            <span className="opt2">Record</span>
        </div>}
       { <div className="header_options">
            <span className="opt1">generate</span>
            <span className="opt2">QR</span>
        </div>}
        {<div className="header_options">
            <span className="opt2">save changes</span>
        </div>}
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