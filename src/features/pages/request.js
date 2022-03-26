import axios from "axios";

const URL = "http://localhost:3001";
export const getClasses = (authUser, token) =>
  axios.get(`${URL}/tutors/my-class?id=${authUser._id}`, {
    headers: {
      Authorization: "hello axios",
    },
  });
export const postAttendance = (attendanceData, tutorId) =>
  axios.post(`${URL}/tutors/take-attendance/?tutorId=${tutorId}`, {
    attendanceData,
  });
export const signUp = (inputs) =>
  axios.post(`${URL}/auth/register`, {
    name: inputs.name,
    email: inputs.email,
    id: inputs.id,
    gender: inputs.gender,
    password: inputs.password,
    userType: inputs.userType,
    department: inputs.department,
    token:inputs.token
  });

export const signIn = (inputs) =>
  axios.post(`${URL}/auth/login`, {
    email: inputs.email,
    password: inputs.password,
  });

export const addClass = (inputs, currentUser) =>
  axios.post(`${URL}/tutors/add-class`, {
    moduleName: inputs.moduleName,
    moduleCode: inputs.moduleCode,
    tutorId: currentUser,
  });

export const addStudentPost = (inputs) =>
  axios.post(`${URL}/tutors/add-student`, {
    email: inputs.email,
    moduleId: inputs.moduleId,
    tutorId: inputs.tutorId,
  });

export const selectThisClass = (moduleCode, tutorId) =>
  axios.get(
    `${URL}/tutors/select-class?moduleCode=${moduleCode}&tutorId=${tutorId}`
  );

export const reqMyAttendance = (moduleId, studentId) =>
  axios.get(`${URL}/students/my-attendance/`, {
    params: { moduleId, studentId },
  });

export const getAllClasses = (data) => axios.get(`${URL}/admin/all-classes`);

export const getAllMyClasses = (data) =>
  axios.get(`${URL}/tutors/my-class`, { params: { tutorId: data } });

export const getAllStudents = (data) => axios.get(`${URL}/admin/all-students`);

export const getAllTutors = (data) => axios.get(`${URL}/admin/all-tutors`);

export const axiosDeleteUser = (data) =>
  axios.delete(`${URL}/admin/delete-account`, { params: { _id: data } });

export const axiosDeleteClass = (moduleId) =>
  axios.delete(`${URL}/admin/delete-class`, { params: { moduleId } });

export const getAllAttendanceOfClass = (data,tutorId) =>
  axios.get(`${URL}/tutors/all-attendance-of-class`, {
    params: { moduleId: data ,tutorId},
  });

export const axiosDeleteStudent = (data) =>
  axios.delete(`${URL}/tutors/delete-student`, {
    params: {
      moduleId: data.moduleId,
      studentId: data.stdId,
      tutorId: data.tutorId,
    },
  });

export const adminResetPassword = (data) =>
  axios.post(`${URL}/admin/update-password`, {
    email: data.email,
    newPassword: data.newPassword,
  });

export const updateUserDetail = (data, _id) =>
  axios.post(
    `${URL}/common/update-detail/`,
    { name: data.name, email: data.email, department: data.department, gender: data.gender },
    { params: { userId: _id } }
  );

export const updatePassword = (data, _id) =>
  axios.post(
    `${URL}/common/update-password/`,
    { newPassword: data.newPassword },
    { params: { userId: _id } }
  );

export const updateClass = (data, moduleId, tutorId) =>
  axios.post(
    `${URL}/tutors/update-class/`,
    { ...data },
    { params: { moduleId, tutorId } }
  );

export const axiosDeleteClassTutor = (moduleId, tutorId) =>
  axios.delete(`${URL}/tutors/delete-class`, { params: { moduleId, tutorId } });

export const resetAttendance = (attendanceId, status, tutorId) =>
  axios.post(
    `${URL}/tutors/change-attendance/`,
    { status },
    { params: { attendanceId, tutorId } }
  );

export const getAllMyModules = (studentId) =>
  axios.get(`${URL}/students/my-class/`, { params: { studentId } });

  export const getAllStudentsByDepartment = (tutorId,department) =>
  axios.get(`${URL}/tutors/get-students-by-department/`, { params: { tutorId,department } });

  export const getAllTokens = () =>
  axios.get(`${URL}/admin/tokens`);

  export const deleteAllTokens = () =>
  axios.delete(`${URL}/admin/tokens`);

  export const createStudentsToken = (token) =>
  axios.post(
    `${URL}/admin/create-students-token`,
    { token }
  );
  export const createTutorsToken = (token) =>
  axios.post(
    `${URL}/admin/create-tutors-token`,
    { token }
  );

  export const changeClassProperty=(property,tutorId,moduleId)=>
    axios.post(
      `${URL}/tutors/change-class-property`,
      { property,tutorId,moduleId }
    );

  