import React from 'react';
import './App.css';
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
import EditClassDetails from './features/pages/EditClassDetails/EditClassDetails';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
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
      <Route path="/edit-class-details" element ={<EditClassDetails/>}/>
  
    </Routes>
  </BrowserRouter>
     
        
        
       
    </div>
  );
}

export default App;
