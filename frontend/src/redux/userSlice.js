import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, authenticated: false },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.authenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.authenticated = false;
      window.localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
