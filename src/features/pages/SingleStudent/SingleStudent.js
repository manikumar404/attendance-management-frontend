import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetAttendance, selectCurrentClass, user } from '../../slices/dataSlice';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';


import { resetAttendance as axiosResetAttendance } from '../request';
import { DoughnoutChart } from './DoughnoutChart'

function SingleStudent() {
  const currentClass = useSelector(selectCurrentClass)
  const authUser = useSelector(user)
  const dispatch = useDispatch()
  const { currentStudent } = currentClass
  const navigate = useNavigate()
  const totalPresent = currentStudent.attendance.filter(x => x.status === "P").length
  const totalAbsent = currentStudent.attendance.filter(x => x.status === "A").length
  const totalClass = currentStudent.attendance.length
  const absenteseAllowable = 10 - totalAbsent
  const classRemaining = 75 - totalClass
  const leaveAllowable = absenteseAllowable - totalAbsent
  const leaveUsed =  totalAbsent



  const data = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: '# of Votes',
        data: [totalPresent, totalAbsent],
        backgroundColor: [
          'rgb(25, 135, 84)',
          'rgba(173, 37, 0, 0.85)'

        ],
        borderColor: [
          'rgb(25, 135, 84)',
          'rgba(173, 37, 0, 0.85)'

        ],
        borderWidth: 1,
      },
    ],
  };
  const data1 = {
    labels: ['Class Taken', 'Class Remaining'],
    datasets: [
      {
        label: '# of Votes',
        data: [totalClass, classRemaining],
        backgroundColor: [
          'rgba(224, 226, 11, 0.92)',
          'rgba(148, 227, 11, 0.92)'

        ],
        borderColor: [
          'rgba(224, 226, 11, 0.92)',
          'rgba(148, 227, 11, 0.92)'
        ],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: ['Leave Allowable', 'Leave Used'],
    datasets: [
      {
        label: '# of Votes',
        data: [leaveAllowable, leaveUsed],
        backgroundColor: [
          'rgba(11, 227, 157, 0.92)',
          'rgba(11, 103, 227, 0.92)'

        ],
        borderColor: [
          'rgba(11, 227, 157, 0.92)',
          'rgba(11, 103, 227, 0.92)'

        ],
        borderWidth: 1,
      },
    ],
  };
  const changeAttendance = async (attendanceId, status, index) => {
    const currentStatus = status === 'P' ? 'A' : 'P'
    try {
      const res = await axiosResetAttendance(attendanceId, currentStatus, authUser._id)
      dispatch(resetAttendance({ status: res.data, index }))

    } catch (err) {
      console.log(err.response)
    }


  }
  return (
    <div>
      <Header>
        {
          <div className="header_options" onClick={() => navigate('/')}>
            <span className="opt1">{authUser?.name}</span>
            <span className="opt2">sign out</span>
          </div>
        }

      </Header>
      <div>
        <h2 className='text-center'>{currentStudent?.name}'s Attendance</h2>
        <div className="row">
          <div className="col col-md-4">
            <DoughnoutChart data={data} />
            <p className='text-center'>Attendance Percentage</p>

          </div>
          <div className="col col-md-4">
            <DoughnoutChart data={data1} />
            <p className='text-center'>Class Taken</p>

          </div>
          <div className="col col-md-4">
            <DoughnoutChart data={data2} />
            <p className='text-center'>Absentese Allowable</p>

          </div>
        </div>






        <div className='row mx-2'>{
          currentStudent?.attendance?.map((att, index) =>
            <div className='col-md-4 col-sm-6'>
              <div className={att.status==="P"?" alert alert-success mb-3":"alert alert-danger mb-3"}>
                <div className="alert-heading text-center">{att.status === 'P' ? 'Present' : 'Absent'}</div>
                <div>

                  <p className='text-center'>{att.createdAt}</p>
                 

                  
                </div>
                <div className="text-muted text-center">last updated at: 
                  {att.updatedAt}
                </div>
                <div className='d-flex justify-content-center my-2'>
                  {authUser.userType === 'tutor' && <button className ="btn btn-outline-danger" onClick={() => changeAttendance(att._id, att.status, index)}>change attendance</button>}


                  </div>
              </div>
            </div>

            //  <div key={att._id} className='single-attendance'>

            //  <div className={att.status}>
            //  <p>{att.createdAt}</p>
            //  {

            // att.createdAt !== att.updatedAt&&<p>{att.updatedAt}</p>

            //  }
            //  <p>{att.status}</p>
            //  </div>
            // {authUser.userType === 'tutor' && <button onClick={()=>changeAttendance(att._id,att.status,index)}>change attendance</button>}
            //  </div>
          )
        }

        </div>



        {

        }

      </div>




    </div>

  )
}

export default SingleStudent