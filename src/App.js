import React, { useEffect } from 'react';
import Home from './features/pages/Home/Home.js'
import MyClass from './features/pages/MyClass/MyClass.js'
import AddClass from './features/pages/AddClass/AddClass'
import AllAttendance from './features/pages/AllAttendance/AllAttendance'
import SingleStudent from './features/pages/SingleStudent/SingleStudent'
import Signup from './features/pages/Authentication/Signup'
import Login from './features/pages/Authentication/Login'
import QRcode from './features/pages/QRcode/QRcode'
import StudentHome from './features/pages/Home/StudentHome';
import AdminHome from './features/pages/Home/AdminHome';
import Profile from './features/pages/Profile/Profile';
import ProfileEdit from './features/pages/Profile/ProfileEdit';
import EditClassDetails from './features/pages/EditClassDetails/EditClassDetails';
import {
  BrowserRouter,
  Routes,
  Route,
  //useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { user,setUser } from './features/slices/dataSlice';
import { findUserWithId } from './features/pages/request';

function App() {
  const authUser = useSelector(user)
  const dispatch = useDispatch()
  //const navigate = useNavigate()
  useEffect(()=>{
    // if(!authUser){
    //   navigate('/')
    //   //findUserWithId(authUser._id).then(res => dispatch(setUser(res.data))).catch(err => console.log(err.response))
    // }
    
  
  },[])
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/single-student" element={<SingleStudent/>}/>
    <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/MyClass" element={<MyClass/>}/>
      <Route path="/add-class" element={<AddClass/>}/>
      <Route path="/all-attendance" element={<AllAttendance/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/generate-qr" element={<QRcode/>}/>
      <Route path="/student-home" element={<StudentHome/>}/>
      <Route path="/admin-dashboard" element={<AdminHome/>}/>
      <Route path="/profile" element ={<Profile/>}/>
      <Route path='/ProfileEdit' element={<ProfileEdit/>}/>
      <Route path="/edit-class-details" element ={<EditClassDetails/>}/>
  
    </Routes>
  </BrowserRouter>      
       
    </div>
    
  );
}

export default App;
