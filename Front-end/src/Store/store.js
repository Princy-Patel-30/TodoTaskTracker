import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Store/Features/UserSlice';
import taskReducer from '../Store/Features/TaskSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
  },
});
