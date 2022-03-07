import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {selectClasses,setClasses,user} from '../../slices/dataSlice';
import axios from 'axios'
import { useEffect } from 'react';
import SingleClass from '../../components/SingleClass/SingleClass';
import styles from '../../counter/Counter.module.css';
import {useNavigate} from 'react-router-dom'
import Header from '../../components/Header/Header';


function Home() {
    const classes = useSelector(selectClasses);
    const authUser = useSelector(user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        axios
        .get(`http://localhost:3001/tutors/my-class?id=${authUser._id}`)
        .then(function (response) {
          dispatch(setClasses(response.data));
      
          
        })
        .catch(function (error) {
          
          console.log(error);
        })
        .then(function () {
        });
       
      }, []);

      const add=()=>{
       return navigate('/add-class')
      }

   

  return (
    <div>
    <Header/>
    <br/>
    <button className={styles.button} onClick = {add} >Add Class</button>
    <br/>
    {classes.map((clas,index)=> <SingleClass key = {clas._id} index = {index} {...clas}/>)}
    </div>
  )
}

export default Home