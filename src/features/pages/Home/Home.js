import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {selectClasses,deleteOneClass,user} from '../../slices/dataSlice';
import { useEffect } from 'react';
import SingleClass from '../../components/SingleClass/SingleClass';
import styles from './Home.css'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import Header from '../../components/Header/Header';
import { deleteClass } from '../request';


function Home() {
    const classes = useSelector(selectClasses);
    const [state,setState]= useState({
      input:''
    })
    const authUser = useSelector(user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
      const add=()=>{
       return navigate('/add-class')
      }
const handleChange =(event)=>{
  setState({...state,input:event.target.value})

}

const deleteClass = (event)=>{
  event.preventDefault()

  deleteClass(state.input).then(res =>dispatch(deleteOneClass(state.input))).catch(err=> console.log(err.response.data))
  

}
   

  return (
    <div>
    <Header/>
    <br/>
    <button className={styles.button} onClick = {add} >Add Class </button>
    
    <form onSubmit={deleteClass}>
    <label>Enter module code:
      <input 
        type="text" 
        name="input" 
        value={state.input || ""} 
        onChange={handleChange}
      />
      </label>
      <button className={styles.button} type = 'submit' >delete Class </button>
    </form>

    <br/>
    {authUser.moduleList.map((clas,index)=> <SingleClass key = {clas.id} index = {index} {...clas}/>)}
    </div>
  )
}

export default Home