import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const theme = localStorage.getItem("theme");
  return theme ? theme : "system";
};

const initialState = {
  theme: getInitialState(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
