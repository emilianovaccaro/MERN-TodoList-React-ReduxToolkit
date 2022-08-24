import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoService from './todoService';


const initialState = {
  todos: [],
  isError: false,
  isLoading: false,
  isCompleted: false,
  message: '' 
};

// Create new todo/task
export const createTodo = createAsyncThunk(
  'todos/create',
  async (todoData, thunkAPI) => {
    try {
      // User getState
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.createTodo(todoData, token);

    } catch (error) {
      const msg = error.message || error.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

// Get todos
export const getTodos = createAsyncThunk(
  'todos/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.getTodos(token);
      
    } catch (error) {
      const msg = error.message || error.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
);


// delete  todo/task
export const deleteTodo = createAsyncThunk(
  'todos/delete',
  async (id, thunkAPI) => {
    try {
      // User getState
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.deleteTodo(id, token);

    } catch (error) {
      const msg = error.message || error.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
)


export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading   = false;
        state.isCompleted = true;
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError   = true;
        state.message   = action.payload;
      })
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading   = false;
        state.isCompleted = true;
        state.todos       = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError   = true;
        state.message   = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading   = false;
        state.isCompleted = true;
        state.todos       = state.todos.filter((todo) => todo._id !== action.payload.id );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError   = true;
        state.message   = action.payload;
      })
  }
  
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer; 