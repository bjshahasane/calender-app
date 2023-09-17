import { createSlice } from '@reduxjs/toolkit';


// const initialState = JSON.parse(localStorage.getItem('tasksList')) || [];
const getInitialTasks = () => {
  const localTaskList = localStorage.getItem('tasksList');
  if (localTaskList) {
    console.log("this is", JSON.parse(localTaskList))
    return JSON.parse(localTaskList);
  }
  localStorage.setItem('tasksList', []);
  return [];
};

const initialState = getInitialTasks();

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    localStorage.setItem('tasksList', JSON.stringify(state));
    },
  },
  // extraReducers: (builder) => {
    
  // },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
