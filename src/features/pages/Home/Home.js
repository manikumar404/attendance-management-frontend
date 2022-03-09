import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {selectClasses,setClasses,user} from '../../slices/dataSlice';
import { useEffect } from 'react';
import SingleClass from '../../components/SingleClass/SingleClass';
import styles from './Home.css'
import {useNavigate} from 'react-router-dom'
import Header from '../../components/Header/Header';


function Home() {
    const classes = useSelector(selectClasses);
    const authUser = useSelector(user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
      const add=()=>{
       return navigate('/add-class')
      }

   

  return (
    <div>
    <Header/>
    <br/>
    <button className={styles.button} onClick = {add} >Add Class</button>
    <br/>
    {authUser.moduleList.map((clas,index)=> <SingleClass key = {clas.id} index = {index} {...clas}/>)}
    </div>
  )
}

export default Home