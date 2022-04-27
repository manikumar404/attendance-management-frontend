import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectClasses,
  deleteOneClass,
  user,
  setClasses,
  addClass,
} from "../../slices/dataSlice";
import { useEffect } from "react";
import SingleClass from "../../components/SingleClass/SingleClass";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { deleteClass, getAllStudentsByDepartment } from "../request";
import { getAllMyClasses, addClass as addClassPost } from "../request";
import {Alert, Button, Modal, Form} from 'react-bootstrap';
// import bg from '../../../assets/bg.svg'
// import wave from '../../../assets/wave.png'

function Home() {
  const classes = useSelector(selectClasses);
  const [state, setState] = useState({
    input: "",
  });
  const authUser = useSelector(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const add = () => {
    return navigate("/add-class");
  };
  const handleChange = (event) => {
    const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    setState({ ...state, input: event.target.value });
    const handleSubmit = (event) => {
      event.preventDefault();
     
      addClassPost(inputs,currentUser._id).then(res => dispatch(addClass(res.data)))
      .catch(err => setInputs({...inputs,error:err.response?.data}))
    
    }
  };


  const deleteClass = (event) => {
    event.preventDefault();

    deleteClass(state.input)
      .then((res) => dispatch(deleteOneClass(state.input)))
      .catch((err) => console.log(err.response.data));
  };

  const getClasses = () => {
    getAllStudentsByDepartment(authUser._id,'4it').then(res=>console.log(res.data)).catch(err => console.log(err.response))
    getAllMyClasses(authUser._id,authUser.token)
      .then((res) => {
        console.log(res.data)
        dispatch(setClasses(res.data));
      })
      .catch((err) => console.log(err));
  };

//  Modal
    const currentUser = useSelector(user)
    const [ setInputs] = useState({moduleName:'',moduleCode:''});    
    const handleSubmit = (event) => {
      event.preventDefault();     
      addClassPost(inputs,currentUser._id).then(res => dispatch(addClass(res.data)))
      .catch(err => setInputs({...inputs,error:err.response?.data}))    
    }
  
  const {
    name
    } = useSelector(user);
    const [inputs] = useState({
      name
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  
  console.log('render')
  useEffect(()=>{
    console.log('resource type changed')
  }, [SingleClass]
  )

  return (
    <div>
      <Header>        
      </Header><br/>
      <Alert variant="success">
        <Alert.Heading>TUTORS DASHBOARD</Alert.Heading>
        <p>
           Attendance Management System
        </p>
        <hr />
        <p className="mb-0">
          My Class
        </p>
        
        {/* <div className="header_options d-flex justify-content-end" onClick={add}>
            <Button variant="outline-success ">Add New Class</Button>
          </div>       */}

          <>
          <div className="header_options d-flex justify-content-end" >
            <Button variant="outline-success" onClick={handleShow}>
              Add New Class
            </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Class</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form className='Acard' onSubmit={handleSubmit}>
                <p>{inputs.error}</p>
                <form>
                <div class="form-group">
                  <label for="formGroupExampleInput">Module Code</label>
                  <input 
                className='form-control'
                  type="text" 
                  name="moduleCode" 
                  placeholder='module code'
                  value={inputs.moduleCode } 
                  onChange={handleChange}
                />
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput2">Module Name</label>
                  <input 
                  className='form-control'
                  type="text" 
                  name="moduleName" 
                  placeholder='module name'
                  value={inputs.moduleName} 
                  onChange={handleChange}
                />
             </div>
             </form><br/>
             <input variant="outline-success " className='btn btn-outline-success' type="btn" value="SUBMIT" />
             </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
    </>

      </Alert>  

     

      <div className="d-grid gap-2 col-6 mx-auto">
        <button className="btn btn-success" type="button" onClick={getClasses}>SHOW MY CLASSES</button>
      </div>           
      {classes.length>0&&classes.map((clas, index) => (
        <SingleClass key={clas._id} index={index} {...clas} />
      ))}




    </div>



    
  );
}

export default Home;
