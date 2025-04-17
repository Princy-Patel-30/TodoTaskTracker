import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const base_url =  import.meta.env.VITE_BASE_URL
export const fetchTodos = createAsyncThunk('tasks/fetchTodos', async () => {
  const response = await axios.get(`${base_url}/tasks`)
  return response.data
})

const initialState = {
  tasks: [],
  status: 'idle',
  error: null
}

const TaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tasks = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { addTask } = TaskSlice.actions
export default TaskSlice.reducer 