
 import React from 'react'
 import { useState } from "react";
 import { useDispatch,useSelector } from 'react-redux';
import {user,selectCurrentClass,deleteStudentFromState, setCurrentClass,} from '../../slices/dataSlice';
import Header from '../../components/Header/Header';
import { updateClass,axiosDeleteStudent,deleteClass} from '../request';
import { useNavigate } from 'react-router-dom';
import {Accordion} from 'react-bootstrap';

function EditClassDetails() {
   const  { moduleName,moduleCode,moduleId,students,tutorId}=useSelector(selectCurrentClass)
   const navigate = useNavigate()

    const dispatch = useDispatch()
    const currentUser = useSelector(user)
    const [inputs, setInputs] = useState({ moduleName,moduleCode});
    const [componentsState,setComponentsState]=useState({showStdList:true,error:'',success:''})
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs)
        setComponentsState({...componentsState,error:'',success:'Updating ...'})
       
        updateClass(inputs,moduleId,tutorId).then(res => {
          setComponentsState({...componentsState,error:'',success:'Successfully Updated !'})
          dispatch(setCurrentClass(res.data))
        })
        .catch(err =>setComponentsState({...componentsState,success:'',error:err.response.data || 'Some error ocurred!'}) )
      
      }
//
      const showAllStd=()=>{
        console.log("hekllo")
     setComponentsState({...componentsState,showStdList:!componentsState.showStdList})
      }

      const deleteStd=(stdId)=>{
        axiosDeleteStudent({
          stdId,
          moduleId,
          tutorId
        }).then(res =>dispatch(deleteStudentFromState(stdId))).catch(err=>console.log(err.response.data))
        
      }


  return (
    <div>
    <Header>
    {
          <div className="header_options" onClick={()=>navigate('/')}>
            <span className="opt1">{currentUser.name}</span>
            <span className="opt2">sign out</span>
          </div>
        }

    </Header>
  
 <div className ="row">
   <div className='col-lg-4 col-md-3'>
   </div>
   <div className='col-lg-4 col-md-6 p-4'>
   <form className ="border rounded py-5 px-3 shadow" onSubmit={handleSubmit}>
   <h4  className="form-label text-center mb-4">Class Details</h4>
  <div className="mb-3">
    <p  className="form-label">Module Name</p>
    <input  className="form-control" type="text" 
     name="moduleName" 
     value={inputs.moduleName || ""} 
     onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  <div class="mb-3">
    <p  className="form-label">Module Code</p>
    <input type="text" 
     name="moduleCode" 
     value={inputs.moduleCode || ""} 
     onChange={handleChange} className="form-control" id="exampleInputPassword1"/>
  </div>
  {
             componentsState?.error?.length>0&& <div className="alert alert-danger my-2">{componentsState.error}</div>
             
             }
             {
             componentsState.success.length>0&& <div className="alert alert-success my-2">{componentsState.success}</div>
             
             }
  
  <button type="submit" className="btn btn-success">Submit</button>
</form>

   </div>
   <div className='col-lg-4 col-md-3'>
   </div>
 </div>
 
 
 <div className ="row">
 <div className = "col-md-3 col-lg-4"></div>
   <div className = "col-md-6 col-lg-4">
   <Accordion defaultActiveKey="1" flush style={{margin:"0",padding:"0"}}>
  <Accordion.Item eventKey="0">
    <Accordion.Header className = "alert-success" onClick={()=>showAllStd()}>View Students</Accordion.Header>
    <Accordion.Body>
    {students.map(std=>
      <div className="card">
  <div className="card-header">
    {std.name}
  </div>
  <div className="card-body">
    <h5 className="card-title">{std.email}</h5>
    <p className="card-text">{std.gender}</p>
    <button  className="btn btn-outline-danger" onClick={()=>deleteStd(std._id)} >deleteStudent</button>
  </div>
  <div className = "col-md-3 col-lg-4"></div>
</div>
    )

    }
   
      
    </Accordion.Body>
  </Accordion.Item>
 
</Accordion>
   </div>
 </div>


 </div>
  )
}

export default EditClassDetails