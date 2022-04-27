import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentClass,
  putAttendance,
  takeAttendance,
  user,
  setAttendance,
} from "../../slices/dataSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddStudent from "../../components/AddStudent/AddStudent";
import Header from "../../components/Header/Header";
import { getAllAttendanceOfClass, postAttendance } from "../request";
import { faFilePowerpoint, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


function MyClass() {
  const currentClass = useSelector(selectCurrentClass);
  const authUser = useSelector(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const putPresent = (id_, index) => {
    dispatch(putAttendance({ index: index, status: "P" }));
  };
  const putAbsent = (id_, index) => {
    dispatch(putAttendance({ index: index, status: "A" }));
  };
  const allRecord = () => {
    getAllAttendanceOfClass(currentClass.moduleId,authUser._id)
      .then((res) => {
        console.log(res.data[0].status)
        dispatch(setAttendance(res.data));
        navigate("/all-attendance");
      })
      .catch((err) => console.log(err.response.data));
   
  };
  const save = () => {
    const attendanceData = [];
    for (var i = 0; i < currentClass.students.length; i++) {
      attendanceData.push({
        status: currentClass.students[i].currentAttendance,
        moduleId: currentClass.moduleId,
        studentId: currentClass.students[i]._id,
        tutorId: currentClass.tutorId,
      });
    }
    postAttendance(attendanceData,authUser._id)
      .then((res) => {
     console.log(res.data)
      })
      .catch((err) => console.log(err.response));
  };
  

  return (
    <div>
      <Header>
        {
          <div className="header_options" onClick={allRecord}>
            <span className="opt1">All</span>
            <span className="opt2">Records</span>
          </div>
        }
        {
          <div className="header_options" onClick={save}>
            <span className="opt1">Save</span>
            <span className="opt2">Record</span>
          </div>
        }
        {
          <div
            className="header_options"
            onClick={() => navigate("/edit-class-details")}
          >
            <span className="opt1">Edit</span>
            <span className="opt2">Class Details</span>
          </div>
        }
        {
          <div
            className="header_options"
            onClick={() => navigate("/generate-qr")}
          >
            <span className="opt1">Generate</span>
            <span className="opt2">QR Code</span>
          </div>
        }
        {
          <div className="header_options" onClick={() => navigate("/")}>
            <span className="opt1">{authUser.name}</span>
            <span className="opt2">sign out</span>
          </div>
        }
      </Header>
      <br />

      <AddStudent className="in-line" id={currentClass._id} />

      <br />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Attendance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentClass.students.map((student, index) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.gender}</td>
              <td
                id={student._id || "default"}
                className={currentClass.students[index].currentAttendance}
              >
                {currentClass.students[index].currentAttendance}
              </td>
              <td>
                <div
                  onClick={() => putPresent(student._id, index)}
                  title="put student present"
                  className="btnn border-shadow update"
                >
                  <span title="put student present" className="text-gradient">
                    <FontAwesomeIcon icon={faFilePowerpoint} />
                  </span>
                </div>
                <div
                  onClick={() => putAbsent(student._id, index)}
                  title="put student absent"
                  className="btnn border-shadow delete"
                >
                  <span title="put student absent" className="text-gradient">
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyClass;
