import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentClass,
  putAttendance,
  takeAttendance,
  addStudent,
  user,
  setAttendance,
} from "../../slices/dataSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddStudent from "../../components/AddStudent/AddStudent";
import Header from "../../components/Header/Header";
import { addStudentPost } from "../../pages/request";
import {
  getAllAttendanceOfClass,
  postAttendance,
  getAllStudentsByDepartment,
} from "../request";
import { faFilePowerpoint, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import lo from "../../../assets/login.png";
import absent from "../../../assets/absent.png";
import allrecord from "../../../assets/allrecord.png";
import qrcode from "../../../assets/qrcode.png";

function MyClass() {
  const currentClass = useSelector(selectCurrentClass);
  const authUser = useSelector(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [messages,setMessages]=useState({save:'Save Record'})

  const putPresent = (id_, index) => {
    dispatch(putAttendance({ index: index, status: "P" }));
  };
  const putAbsent = (id_, index) => {
    dispatch(putAttendance({ index: index, status: "A" }));
  };
  const allRecord = () => {
    getAllAttendanceOfClass(currentClass.moduleId, authUser._id)
      .then((res) => {
        console.log(res.data[0].status);
        dispatch(setAttendance(res.data));
        navigate("/all-attendance");
      })
      .catch((err) => console.log(err.response.data));
  };
  const save = () => {
    setMessages({...messages,save:"Saving ..."})
    const attendanceData = [];
    for (var i = 0; i < currentClass.students.length; i++) {
      attendanceData.push({
        status: currentClass.students[i].currentAttendance,
        moduleId: currentClass.moduleId,
        studentId: currentClass.students[i]._id,
        tutorId: currentClass.tutorId,
      });
    }
    postAttendance(attendanceData, authUser._id)
      .then((res) => {
        setMessages({...messages,save:"Record Saved"})
      })
      .catch((err) => console.log(err.response));
  };
  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    if (error.length > 0) {
      setError("");
    }
  };

  const handleSubmitEmail = (event) => {
    event.preventDefault();
    const inputs = {
      email,
      moduleId: currentClass.moduleId,
      tutorId: currentClass.tutorId,
    };
    console.log(inputs);

    addStudentPost(inputs)
      .then((res) => {
        dispatch(addStudent(res.data));
      })
      .catch((err) => setError(err.response.data));
  };
  const onClickStudent = (email) => {
    const inputs = {
      email,
      moduleId: currentClass.moduleId,
      tutorId: currentClass.tutorId,
    };
    console.log(inputs);

    addStudentPost(inputs)
      .then((res) => {
        dispatch(addStudent(res.data));
        const studentsIds = currentClass.students.map(
          (studentx) => studentx._id
        );
        const stdList = res.data.filter(
          (item) => !studentsIds.includes(item._id)
        );

        setStudentsList(stdList);

        console.log(res.data);
      })
      .catch((err) => setError(err.response?.data))
      
  };
  const handleChangeDepartment = (event) => {
    const value = event.target.value;
    setDepartment(value);
    if (error.length > 0) {
      setError("");
    }
  };

  const handleSubmitDepartment = (event) => {
    event.preventDefault();

    getAllStudentsByDepartment(currentClass.tutorId, department)
      .then((res) => {
        const studentsIds = currentClass.students.map(
          (studentx) => studentx._id
        );
        const stdList = res.data.filter(
          (item) => !studentsIds.includes(item._id)
        );

        setStudentsList(stdList);
      })
      .catch((err) => setError(err.response?.data));
  };

  return (
    <div>
      <Header>
        {/* {
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
        } */}
        {/* {
          <div className="header_options" onClick={() => navigate("/")}>
            <span className="opt1">{authUser.name}</span>
            <span className="opt2">sign out</span>
          </div>
        } */}
      </Header>
      <br />


<div className="card m-4 p-4">
<h3 className="pb-2 border-bottom">Attendance Management Actions</h3>
<div className="row">
  <div className="col-md-4"  onClick={allRecord}>
  <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={allrecord}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">          
              View All Record
          </Typography>
          <Typography variant="body2" color="text.secondary">
          View all attendance records
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card><br/>
  </div>
  <div className="col-md-4" onClick={() => navigate("/edit-class-details")}>
  <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={lo}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
              Edit Class Details
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Edit name, module code and students in a class.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card><br/>
  </div>
  <div className="col-md-4" onClick={() => navigate("/generate-qr")}>
  <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={qrcode}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Generate QR Code
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Generate a QR code that can be scanned wit Attendance tracker app.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </div>
</div>
</div>


      
      {/* <AddStudent className="in-line" id={currentClass._id} /> */}
      <button
        type="button"
        className="btn btn-outline-success mx-2"
        onClick={handleShow}
      >
        Add students
      </button>
      <button
        type="button"
        className="btn btn-outline-success float-end mx-2"
        onClick={save}
      >{messages.save}
      </button>

      <br />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form className="Acard">
              <form>
                <div className="form-group">
                  <label for="formGroupExampleInput">Enter student email</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={handleChangeEmail}
                    name="enter student email"
                    value={email}
                    placeholder="Module code"
                  />
                  <p>OR search students by group and add</p>
                </div>
                <button
                  variant="outline-success "
                  className="btn btn-outline-success"
                  type="btn"
                  onClick={handleSubmitEmail}
                >
                  Add
                </button>
                <div className="form-group">
                  <label for="formGroupExampleInput2">
                    Enter group Id/department
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="moduleName"
                    value={department}
                    onChange={handleChangeDepartment}
                    placeholder="Enter group id / department"
                  />
                </div>

                {error?.length > 0 && (
                  <div className="alert alert-danger my-2">{error}</div>
                )}
              </form>
              <br />
              <button
                variant="outline-success "
                className="btn btn-outline-success"
                type="btn"
                onClick={handleSubmitDepartment}
              >
                search
              </button>
            </form>
            <div>
              {studentsList.map((student) => (
                <div class="list-group my-2">
                  <button
                    type="button"
                    className="list-group-item list-group-item-action"
                    onClick={() => onClickStudent(student.email)}
                  >
                    <span>{student.name}</span>
                    <span className="fw-lighter">/ {student.email}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="success" onClick={handleClose}>
                  Save Changes
                </Button> */}
        </Modal.Footer>
      </Modal>

      <div className="card m-4 p-4">
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
                  <span title="put student present" className="text-gradient"  type="button">
                    <FontAwesomeIcon icon={faFilePowerpoint} />
                  </span>
                </div>
                <div
                  onClick={() => putAbsent(student._id, index)}
                  title="put student absent"
                  className="btnn border-shadow delete"
                >
                  <span title="put student absent" className="text-gradient" type="button">
                  <img src={absent}  width='12px' />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  );
}

export default MyClass;
