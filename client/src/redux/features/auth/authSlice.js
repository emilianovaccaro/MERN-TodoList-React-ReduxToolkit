import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user form local storage
const user = JSON.parse(localStorage.getItem('user'));


const initialState = {
  user: user ? user : null,
  isError: false,
  isCompleted: false,
  isLoading: false,
  message: '' 
};

// Register user
export const register = createAsyncThunk(
  'auth/register', 
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const msg = error.message || error.toString();
      return thunkAPI.rejectWithValue(msg);
    }
});

// Login user
// Register user
export const login = createAsyncThunk(
  'auth/login', 
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      const msg = error.message || error.toString();
      return thunkAPI.rejectWithValue(msg);
    }
});

// Logout user - delete localStorage user info
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.logout();
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading   = false;
      state.isCompleted = false;
      state.isError     = false;
      state.message     = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading   = false;
        state.isCompleted = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError   = true;
        state.message   = action.payload;
        state.user      = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading   = false;
        state.isCompleted = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError   = true;
        state.message   = action.payload;
        state.user      = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
  }
});


export const { reset } = authSlice.actions;
export default authSlice.reducer;