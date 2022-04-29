import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  currentClass: {
    moduleId: "",
    students: [],
  },
  user: {},
  classes: [],
  attendance: [],
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
      console.log(action);
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
    setAttendance: (state, action) => {
      const updatedStudents = [];
      const students = [...state.currentClass.students];
      for (const student of students) {
        const attendance = {
          ...student,
          attendance: action.payload.filter(
            (attendance) => attendance.studentId === student._id
          ),
        };
        updatedStudents.push(attendance);
      }
      state.currentClass = { ...state.currentClass, students: updatedStudents };
    },
    addClass: (state, action) => {
      console.log(action.payload)
      state.classes = [...state.classes, action.payload]
      
    },
    setUser: (state, action) => {
      state.user = {...action.payload.user,
      token:action.payload.token}
    },

    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
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
    deleteStudentFromState: (state, action) => {
      console.log(action, "hello");
      state.currentClass = {
        ...state.currentClass,
        students: [
          ...state.currentClass.students.filter(
            (std) => std._id !== action.payload
          ),
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
      // const updatedStudents = []
      // const students = [...state.currentClass.students]
      // for( const student of students){
      //   const attendance = {
      //     ...student,
      //     attendance:[action.payload.filter(attendance => attendance.studentId === student._id)]
      //   }
      //   updatedStudents.push(attendance)
      // }
      // state.currentClass = {...state.currentClass,students:updatedStudents}
    },

    refreshAttendance: (state, action) => {
      const newAttendance = [...state.attendance];
      for (let i = 0; i < newAttendance.length; i++) {
        newAttendance[i].attendance.push(action.payload[i]);
        console.log("hello wai");
      }
      state.attendance = newAttendance;
    },
    resetAttendance: (state, action) => {
      const newAttendance = {
        ...state.currentClass,
        currentStudent: {
          ...state.currentClass.currentStudent,
          attendance: [...state.currentClass.currentStudent.attendance],
        },
      };
      newAttendance.currentStudent.attendance[action.payload.index] =
        action.payload.status;
      state.currentClass = newAttendance;
    },

    setCurrentStudentsClass: (state, action) => {
      state.currentClass = {
        ...action.payload.currentClass,
        currentStudent: {...action.payload.currentStudent,attendance: action.payload.attendance},
        
      };
    },
    deleteOneClass: (state, action) => {
      state.classes = [
        ...state.classes.filter((cls) => cls._id !== action.payload),
      ];
    },
  },
});

export const {
  setCurrentStudentsClass,
  putAttendance,
  setClasses,
  setAttendance,
  setCurrentClass,
  addStudent,
  addClass,
  setCurrentStudent,
  resetAttendance,
  deleteOneClass,
  setUser,
  takeAttendance,
  deleteStudentFromState,
  updateUser,
} = dataSlice.actions;
export const selectClasses = (state) => state.data.classes;
export const selectCurrentClass = (state) => state.data.currentClass;
export const user = (state) => state.data.user;
export const attendance = (state) => state.data.attendance;
export default dataSlice.reducer;
