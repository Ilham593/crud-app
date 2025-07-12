import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  try {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      return {
        data: data,
      };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    data: [],
  };
};

const crudSlice = createSlice({
  name: "crud",
  initialState: getInitialState(),
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload);
      localStorage.setItem("data", JSON.stringify(state.data));
    },
  },
});

export const { addData } = crudSlice.actions;
export default crudSlice.reducer;
