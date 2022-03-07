import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  classes:[],
  status: 'idle',
  currentClass:{},
  user:{}
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
   // const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
   // return response.data;
  }
);

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  
  reducers: {
    increment: (state) => {
      state.classes = [...state.classes,34]
    },
    decrement: (state) => {
        state.classes = [...state.classes,33]
    },
    incrementByAmount: (state, action) => {
        state.classes = [...state.classes,action.payload]
    },
    setClasses: (state,action)=>{
        state.classes = action.payload
        
    },
    setCurrentClass: (state,action)=>{
      const students =[]
      const std= action.payload.students
      for(var i = 0;i<std.length;i++){
        const student = {
          id:std[i].id,
          name:std[i].name,
          email:std[i].email,
          gender:std[i].gender,
          _id:std[i]._id,
          attendance:std[i].attendance,
          currentAttendance:'P',
          serial:i

        }
        students.push(student)
      }
        state.currentClass = {...action.payload,students:students}
        
    },
    addClass: (state,action)=>{
        state.classes = [...state.classes,action.payload]
        
    },
    setUser: (state,action)=>{
      state.user = action.payload
      
  },
    addStudent: (state,action)=>{
        state.currentClass = {...state.currentClass,students:[...state.currentClass.students,
          {...action.payload,currentAttendance:'P',serial:state.currentClass.students.length}]}
        
    },
    putAttendance: (state,action)=>{
      const updated = {...state.currentClass}
      updated.students[action.payload.index].currentAttendance = action.payload.status
      updated.students[action.payload.index].serial = action.payload.index
      state.currentClass = updated
    },
    setCurrentStudent: (state,action)=>{
      state.currentClass = {...state.currentClass,currentStudent:action.payload}
      
  },
  takeAttendance: (state,action)=>{
    state.currentClass = {...state.currentClass,students:action.payload}
    
},
      
  },
  
 
});

export const { increment, decrement, incrementByAmount,putAttendance,
  setClasses,setCurrentClass,addStudent,addClass,setCurrentStudent,setUser,takeAttendance } = dataSlice.actions;
export const selectClasses = (state) => state.data.classes;
export const selectCurrentClass = (state) => state.data.currentClass;
export const user = (state) => state.data.user;
export default dataSlice.reducer;
