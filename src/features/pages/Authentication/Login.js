import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
 import { useState } from "react";
 import axios from "axios";
 import { useDispatch } from 'react-redux';
import {setUser} from '../../slices/dataSlice';
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3001/auth/login',{email:inputs.email,password:inputs.password})
        .then(res =>{
          if(res.status ===200){
              dispatch(setUser(res.data))
              console.log(res)
            navigate('/home')

          }
          else{
            console.log(res)
          }
          
        }
         
          
           )
        .catch(err => {
            setInputs(values => ({...values, message:err.response.data}))
            console.log(inputs)

        }
          
            )
      
      }
  return (
    <div className='login'>
    <div>
     <div className='login_container'>
         <h2>login</h2>
         <form>
            
              <h5>email</h5>
             <input type = 'email' name='email' value ={inputs.email} onChange={handleChange}
            
             />
          
              <h5>password</h5>
             <input type = 'password' name='password' value ={inputs.password1} onChange={handleChange}
            
             />
             <br/>
             <button className="login_btn" type ='submit' onClick={handleSubmit}
            >
                  login
              </button>
              <p className='error'>{inputs.message}</p>
              <p>
             by signing up, you agree the terms<br/>s and 
             conditions of oneshop 
         </p>
         <button className ='signin_btn'
         onClick={()=>navigate('/signup')}
       
         >
            create account
         </button>

         </form>
     </div>
    </div>
  </div>
  )
}

export default Login