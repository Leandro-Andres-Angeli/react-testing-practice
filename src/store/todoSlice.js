import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/mockApi';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => await api.fetchTodos());
export const createTodo = createAsyncThunk('todos/createTodo', async (todo) => await api.createTodo(todo));
export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => await api.updateTodo(todo));
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => await api.deleteTodo(id));

const todoSlice = createSlice({
  name: 'todos',
  initialState: { items: [], status: 'idle', savingId: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchTodos.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload; })
      .addCase(updateTodo.pending, (state, action) => { state.savingId = action.meta.arg.id; })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.savingId = null;
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload);
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});
export default todoSlice.reducer;