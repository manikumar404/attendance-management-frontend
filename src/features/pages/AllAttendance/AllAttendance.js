import React from 'react'
import { useSelector,useDispatch} from 'react-redux';
import {selectCurrentClass,setCurrentStudent} from '../../slices/dataSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './AllAttendance.css'

function AllAttendance() {
    const currentClass = useSelector(selectCurrentClass)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const attendanceRecord = []
    const oneRecord ={}
    for(var i = 0;i<currentClass.students.length;i++){
        if(currentClass.students[i].attendance[0]?.status){
          oneRecord.index = currentClass.students[i].id;
        oneRecord.name = currentClass.students[i].name;
        oneRecord.totalClass = currentClass.students[i].attendance.length
        const present = currentClass.students[i].attendance.filter(item =>item.status==='P')
        oneRecord.totalPresent = present.length
        console.log(oneRecord.totalPresent)
        oneRecord.percentage = (oneRecord.totalPresent/oneRecord.totalClass)*100
        oneRecord.currentAttendance = currentClass.students[i].attendance[currentClass.students[i].attendance.length-1].status
        attendanceRecord.push({...oneRecord})

        }
    }

    const selectThis=(index)=>{

      dispatch(setCurrentStudent(index))
      navigate('/single-student')

    }
  return (
    <div>
    <Header/>
    <div className="container">
              <div className='record-container'>
                  <p className='inline'>Index</p>
                  <p className='inline'>Name</p>
                  <p className='inline'>Total class</p>
                  <p className='inline'>Total present</p>
                  <p className='inline'>Percentage</p>
                  <p className='inline'>current status</p>
               </div>
            {
                attendanceRecord.map((item,index)=>
                <div key={index} className='record-container' onClick={()=>selectThis(index)}>
                  <p className='inline'>{item.index}</p>
                  <p className='inline'>{item.name}</p>
                  <p className='inline'>{item.totalClass}</p>
                  <p className='inline'>{item.totalPresent}</p>
                  <p className='inline'>{item.percentage}</p>
                  <p className='inline'>{item.currentAttendance}</p>
               </div>
                )
            }
        </div>
        </div>
  )
}

export default AllAttendance