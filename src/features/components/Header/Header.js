import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import { useSelector } from 'react-redux'
import { user } from '../../slices/dataSlice'
import { useState } from "react";
import { useDispatch } from "react-redux";
import {Navbar, Nav, Container} from 'react-bootstrap'


function Header(props) {
  const authUser = useSelector(user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!authUser._id){
      console.log("hello no auth user")
      navigate('/')

    }
   
  })
  const dispatch = useDispatch();
  const {
    name
  } = useSelector(user);
  const [inputs] = useState({
    name
  });

  
  return (    
    <div className="header">          
      <Navbar className='bg-success text-light' variant="light" >
        <Container>
          <Navbar.Brand href="#home">
            <div className="header_logo">      
            <a className='logo' href=''><img src={logo} alt="logo" width="40px" /></a>    
            </div>
          </Navbar.Brand>
          <Nav className="me-auto ">
            <div className='text-light'>{inputs.name}</div>                    
          </Nav>
          <Nav>
          <Nav.Link>
              <div className="header_options" onClick={()=>navigate('/profile')}>
                  <span className="text-light">My Profile</span>
              </div>
          </Nav.Link>
            <Nav.Link>
              <div className="header_options text-light" onClick={() => navigate("/")}>
                 <span className="opt2">Sign Out</span>
              </div>
          </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {props.children}     
    
</div> 
  )
}

export default Header