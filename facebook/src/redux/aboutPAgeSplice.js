import { createSlice } from "@reduxjs/toolkit";

export const aboutSplice = createSlice({
  name: "globle",

  initialState: {
    setAboutOption: "Overview",
  },

  reducers: {
    setAboutOption: (state, action) => {
      state.setAboutOption = action.payload;
    },
  },
});

export const { setAboutOption } = aboutSplice.actions;

export default aboutSplice.reducer;
