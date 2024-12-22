import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null, // Persist token in localStorage
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); // Save token to localStorage
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Clear token from localStorage
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
