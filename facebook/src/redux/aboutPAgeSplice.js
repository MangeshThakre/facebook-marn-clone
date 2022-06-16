import { createSlice } from "@reduxjs/toolkit";

export const aboutSplice = createSlice({
  name: "globle",

  initialState: {
    setAboutOption: "Overview",
    togglseConformDeletePopup: false,
    toggleDropdown: false,
    deleteItem: "",
    indexNo: "",
  },

  reducers: {
    setAboutOption: (state, action) => {
      state.setAboutOption = action.payload;
    },
    togglseConformDeletePopup: (state, action) => {
      state.togglseConformDeletePopup = action.payload;
    },
    toggleDropdown: (state, action) => {
      state.toggleDropdown = action.payload;
    },

    deleteItem: (state, action) => {
      state.deleteItem = action.payload;
    },
    indexNo: (state, action) => {
      state.indexNo = action.payload;
    },
  },
});

export const {
  setAboutOption,
  togglseConformDeletePopup,
  deleteItem,
  indexNo,
  toggleDropdown,
} = aboutSplice.actions;

export default aboutSplice.reducer;
