import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  attendance,
  selectCurrentClass,
  setCurrentStudent,
  user,
} from "../../slices/dataSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

function AllAttendance() {
  const currentClass = useSelector(selectCurrentClass);
  const authUser = useSelector(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const attendanceRecord = [];
  const oneRecord = {};
  for (var i = 0; i < currentClass.students.length; i++) {
   
      oneRecord.index = currentClass.students[i].id;
      oneRecord.name = currentClass.students[i].name;
      oneRecord.totalClass = currentClass.students[i].attendance.length
      const present = currentClass.students[i].attendance.filter(
        (item) => item.status === "P"
      );
      oneRecord.totalPresent = present.length;
      console.log(oneRecord.totalPresent);
      oneRecord.percentage =
        ((oneRecord.totalPresent / oneRecord.totalClass) * 100 || 0).toFixed(2)
      oneRecord.currentAttendance = currentClass.students[i].currentAttendance
       
      attendanceRecord.push({ ...oneRecord });
   
  }

  const selectThis = (index) => {
    dispatch(setCurrentStudent(currentClass.students[index]));
    navigate("/single-student");
  };
  return (
    <div>
      <Header>
        {
          <div className="header_options" onClick={()=>navigate('/')}>
            <span className="opt1">{authUser.name}</span>
            <span className="opt2">sign out</span>
          </div>
        }
      </Header>
     

        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Class Taken</th>
              <th scope="col">Class Attended</th>
              <th scope="col">Percentage</th>
              <th scope="col">Current Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecord.map((item, index) => (
              <tr
                key={index}
                className="record-container"
                onClick={() => selectThis(index)}
              >
                <td>{item.name}</td>
                <td>{item.totalClass}</td>
                <td>{item.totalPresent}</td>
                <td>{item.percentage}</td>
                <td>{item.currentAttendance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
   
  );
}

export default AllAttendance;
