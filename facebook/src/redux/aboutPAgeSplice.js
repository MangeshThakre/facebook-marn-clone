import { createSlice } from "@reduxjs/toolkit";

export const aboutSplice = createSlice({
  name: "globle",

  initialState: {
    setAboutOption: "Overview",
    togglseConformDeletePopup: false,
    deleteItem: "",
  },

  reducers: {
    setAboutOption: (state, action) => {
      state.setAboutOption = action.payload;
    },
    togglseConformDeletePopup: (state, action) => {
      state.togglseConformDeletePopup = action.payload;
    },
    deleteItem: (state, action) => {
      state.deleteItem = action.payload;
    },
  },
});

export const { setAboutOption, togglseConformDeletePopup, deleteItem } =
  aboutSplice.actions;

export default aboutSplice.reducer;
