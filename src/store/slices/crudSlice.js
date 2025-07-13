import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  try {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      return {
        data: data,
        searchTerm: "",
        currentPage: 1,
        itemsPerPage: 6,
      };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    data: [],
    searchTerm: "",
    currentPage: 1,
    itemsPerPage: 10,
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
    updateData: (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      localStorage.setItem("data", JSON.stringify(state.data));
    },
    setSearchAndPage: (state, action) => {
      state.searchTerm = action.payload.searchTerm;
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const {
  addData,
  deleteData,
  updateData,
  setSearchAndPage,
} = crudSlice.actions;
export default crudSlice.reducer;
