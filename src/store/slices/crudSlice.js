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
    deleteData: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      localStorage.setItem("data", JSON.stringify(state.data));
    },
    updateData:(state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      localStorage.setItem("data", JSON.stringify(state.data));
    }
  },
});

export const { addData , deleteData, updateData } = crudSlice.actions;
export default crudSlice.reducer;
