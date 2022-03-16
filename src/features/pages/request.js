import axios from "axios";
const URL = "http://localhost:3001";
export const getClasses = (authUser) =>
  axios.get(`${URL}/tutors/my-class?id=${authUser._id}`);
export const postAttendance = (attendanceData) =>
  axios.post(`${URL}/tutors/take-attendance`, attendanceData);
export const signUp = (inputs) =>
  axios.post(`${URL}/auth/register`, {
    name: inputs.name,
    email: inputs.email,
    id: inputs.id,
    gender: inputs.gender,
    password: inputs.password,
    userType: inputs.userType,
  });

export const signIn = (inputs) =>
  axios.post(`${URL}/auth/login`, {
    email: inputs.email,
    password: inputs.password,
  });

  export const addClass =(inputs,currentUser)=> axios.post(`${URL}/tutors/add-class`,{
    className:inputs.className,
    moduleCode:inputs.moduleCode,
    tutor:currentUser._id,
    credit:inputs.credit,
    classStrength:inputs.classStrength
  })

  export const addStudentPost =(inputs)=>axios.post(`${URL}/tutors/add-student`,inputs)

  export const selectThisClass = (moduleCode) =>
  axios.get(`${URL}/tutors/select-class?moduleCode=${moduleCode}`);

  export const reqMyAttendance = (data)=>
    axios.get(`${URL}/students/my-attendance/?moduleCode=${data.moduleCode}`,{ params: { email: data.email } })

    export const getAllClasses = (data)=>
    axios.get(`${URL}/admin/all-classes`)

    export const getAllStudents = (data)=>
    axios.get(`${URL}/admin/all-students`)

    export const getAllTutors= (data)=>
    axios.get(`${URL}/admin/all-tutors`)

    export const axiosDeleteUser= (data)=>
    axios.delete(`${URL}/admin/delete-account`,{ params: { _id: data} })

    export const axiosDeleteClass= (data)=>
    axios.delete(`${URL}/admin/delete-class`,{ params: { _id: data } })

    export const axiosDeleteStudent= (data)=>
    axios.delete(`${URL}/tutors/delete-student`,{ params: { _id: data._id,stdId:data.stdId } })

    export const adminResetPassword= (data)=>
    axios.post(`${URL}/admin/update-password`, { email: data.email,newPassword:data.newPassword })
  
    export const updateUserDetail =(data,_id)=>
    axios.post(`${URL}/common/update-detail/`, { name:data.name,email: data.email,id:data.id,gender:data.gender },{ params: { _id } })

    export const updatePassword =(data,_id)=>
    axios.post(`${URL}/common/update-password/`, { newPassword:data.newPassword },{ params: { _id } })

    export const updateClass =(data,id,tutor)=>
    axios.post(`${URL}/tutors/update-class/`, { ...data},{ params: { id,tutor } })

    export const deleteClass =(id)=>
    axios.delete(`${URL}/tutors/delete-class`,{ params: { moduleCode: id} })
    