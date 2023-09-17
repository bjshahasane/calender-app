import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';

const store = configureStore({
  reducer: {
    taskReducer,
  },
});

export default store;
