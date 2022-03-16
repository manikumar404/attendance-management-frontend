import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  currentClass: {},
  user: {},
};

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    // const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    // return response.data;
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,

  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    setCurrentClass: (state, action) => {
      console.log(action)
      const students = [];
      const std = action.payload.students;
      for (var i = 0; i < std.length; i++) {
        const student = {
          id: std[i].id,
          name: std[i].name,
          email: std[i].email,
          gender: std[i].gender,
          _id: std[i]._id,
          attendance: std[i].attendance,
          currentAttendance: "P",
          serial: i,
        };
        students.push(student);
      }
      state.currentClass = { ...action.payload, students: students };
    },
    addClass: (state, action) => {
      state.user = {
        ...state.user,
        moduleList: [...state.user.moduleList, action.payload],
      };
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser:(state,action)=>{
      state.user = {...state.user,...action.payload}
    },
    addStudent: (state, action) => {
      state.currentClass = {
        ...state.currentClass,
        students: [
          ...state.currentClass.students,
          {
            ...action.payload,
            currentAttendance: "P",
            serial: state.currentClass.students.length,
          },
        ],
      };
    },
    deleteStudentFromState:(state,action)=>{
      console.log(action,'hello')
      state.currentClass = {
        ...state.currentClass,
        students: [
          ...state.currentClass.students.filter(std=>std._id!==action.payload)
          
        ],
      };
    },
    putAttendance: (state, action) => {
      const updated = { ...state.currentClass };
      updated.students[action.payload.index].currentAttendance =
        action.payload.status;
      updated.students[action.payload.index].serial = action.payload.index;
      state.currentClass = updated;
    },
    setCurrentStudent: (state, action) => {
      state.currentClass = {
        ...state.currentClass,
        currentStudent: action.payload,
      };
    },
    takeAttendance: (state, action) => {
      state.currentClass = { ...state.currentClass, students: action.payload };
    },
    setCurrentStudentsClass: (state, action) => {
      state.currentClass = {currentStudent:action.payload} ;
    },
    deleteOneClass:(state,action)=>{
      state.user = {...state.user,moduleList:[...state.user.moduleList.filter(mod =>mod.moduleCode!==action.payload)]}
    }
  },
});

export const {
 setCurrentStudentsClass,
  putAttendance,
  setClasses,
  setCurrentClass,
  addStudent,
  addClass,
  setCurrentStudent,
  deleteOneClass,
  setUser,
  takeAttendance,
  deleteStudentFromState,
  updateUser
} = dataSlice.actions;
export const selectClasses = (state) => state.data.classes;
export const selectCurrentClass = (state) => state.data.currentClass;
export const user = (state) => state.data.user;
export default dataSlice.reducer;
