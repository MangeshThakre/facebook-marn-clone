import { createSlice } from "@reduxjs/toolkit";

export const aboutSplice = createSlice({
  name: "globle",

  initialState: {
    toggleOverview: true,
    toggleWorkAndEducation: false,
    togglePlaceslived: false,
    toggleContactBasicInformation: false,
    toggleFamilyAndRelation: false,
  },

  reducers: {
    toggleOverview: (state, action) => {
      state.toggleOverview = action.payload;
    },
    toggleWorkAndEducation: (state, action) => {
      state.toggleWorkAndEducation = action.payload;
    },
    togglePlaceslived: (state, action) => {
      state.togglePlaceslived = action.payload;
    },
    toggleContactBasicInformation: (state, action) => {
      state.toggleContactBasicInformation = action.payload;
    },
    toggleFamilyAndRelation: (state, action) => {
      state.toggleFamilyAndRelation = action.payload;
    },
  },
});

export const {
  toggleOverview,
  toggleWorkAndEducation,
  togglePlaceslived,
  toggleContactBasicInformation,
  toggleFamilyAndRelation,
} = aboutSplice.actions;

export default aboutSplice.reducer;
