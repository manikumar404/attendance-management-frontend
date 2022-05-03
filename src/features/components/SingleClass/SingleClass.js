import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {setCurrentClass,user,selectCurrentClass, deleteOneClass} from '../../slices/dataSlice';
import {useNavigate} from 'react-router-dom'
import {axiosDeleteClassTutor, selectThisClass} from '../../pages/request'
import {Row,Col, Card} from 'react-bootstrap'

function SingleClass({ index,moduleName,moduleCode,_id}) {
    const navigate = useNavigate()
    const currentUser = useSelector(user)   
    const currentClass = useSelector(selectCurrentClass)
    const dispatch = useDispatch()
    const selectThis = (moduleId)=>{
        selectThisClass(moduleId,currentUser._id).then(res=> {
            console.log(res.data)
            dispatch(setCurrentClass({
                moduleId:moduleId,
                tutorId:currentUser._id,
                students:res.data,
                moduleName:moduleName,
                moduleCode:moduleCode
            }))

        }
            ).then(res=> {
                if(currentUser.userType === 'tutor'){
                    return navigate('/MyClass')

                }
                if(currentUser.userType === 'student'){
                    return navigate('/single-student')

                }
            })  
       
    }
    const deleteClass = (moduleId)=>{
        axiosDeleteClassTutor(moduleId,currentUser._id).then(res => dispatch(deleteOneClass(moduleId))).catch(err => console.log(err.response))
    }    

  return (
    
    // <div className='card'>         
    //     <Row xs={1} md={2} className="g-4">
    //     {Array.from({ length: 4 }).map((_, idx) => (
    //         <Col>
    //         <Card>
    //             <Card.Img variant="top" src="holder.js/100px160" />
    //             <Card.Body>
    //             <Card.Title>
    //             <div className = "class-container" onClick = {()=>selectThis(_id)}>
    //                 <div>
    //                     <h2>{moduleName}</h2>
    //                 </div>
    //                 <div>
    //                     <p>Moudle code {moduleCode}</p>
    //                 </div>
    //             </div>
    //             </Card.Title>
    //             <Card.Text>
    //                 <button onClick={()=>deleteClass(_id)} >Delete </button>
    //             </Card.Text>
    //             </Card.Body>
    //         </Card>
    //         </Col>
    //     ))}
    //     </Row>

    
    // </div>  Name
    <div className="card text-center my-2">
    <div className="card-header alert-success" onClick = {()=>selectThis(_id)}>
    {moduleName}
    </div>
    <div className="card-body">
      <h5 className="card-title">{moduleCode}</h5>
      
      <button className="btn btn-outline-danger" onClick={()=>deleteClass(_id)}>Delete Class</button>
    </div>
    <div className="card-footer text-muted">
      2 days ago
    </div>
  </div>
    
      
  )  
}

export default SingleClass