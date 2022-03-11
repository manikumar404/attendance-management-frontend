import React from 'react'
import Header from '../../components/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import {selectCurrentClass,user} from '../../slices/dataSlice'
import { useEffect } from 'react';

function QRcode() {
    const currentClass = useSelector(selectCurrentClass)
   
  return (
    <div>
    <Header/>
    <img src={`https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${currentClass._id}`}/>
    </div>
  )
}

export default QRcode