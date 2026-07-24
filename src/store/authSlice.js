import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/mockApi';

export const loginUser = createAsyncThunk('auth/login', async ({ username, password }) => {
  const response = await api.login(username, password);
  localStorage.setItem('token', response.token);
  return response.token;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.token = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;