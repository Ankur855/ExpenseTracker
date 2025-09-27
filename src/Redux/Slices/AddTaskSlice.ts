import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Task} from '../type';

// interface for task deatils type
interface TodoState {
  tasks: Task[];
}
// intial Ste for the slice
const initialState: TodoState = {
  tasks: [],
};
// creating slice for handling create , update , delete operations
const AddTaskSlice = createSlice({
  // name of the slice
  name: 'todo',
  // initialstate of slice
  initialState,
  // logic for the opertions with payload
  reducers: {
    addTask: (state: any, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateStatus: (
      state: any,
      action: PayloadAction<{id: string; status: Task['status']}>,
    ) => {
      let task = state.tasks?.find(
        (item: any) => item.id === action.payload.id,
      );
      if (task) {
        task.status = action.payload.status;
      }
    },
    deleteTask: (state: any, action: PayloadAction<string>) => {
      state.tasks = state.tasks?.filter(
        (tasks: any) => tasks.id !== action.payload,
      );
    },
  },
});

export const {addTask, updateStatus, deleteTask} = AddTaskSlice.actions;

export default AddTaskSlice.reducer;
