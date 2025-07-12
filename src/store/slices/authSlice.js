import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username && user.fullname) {
      return {
        user: user,
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    user: null,
    isAuthenticated: false,
  };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    updateProfile: (state, action) => {
      state.user.fullname = action.payload.fullname;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
