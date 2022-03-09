import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/slices/dataSlice';


export const store = configureStore({
  reducer: {
    data:dataReducer,
    
  },
});
