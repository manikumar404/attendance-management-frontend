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