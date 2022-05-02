import { createSlice } from "@reduxjs/toolkit";

export const globleSplice = createSlice({
  name: "globle",

  initialState: {
    toggleCreatePost: false,
  },

  reducers: {
    toggleCreatePost: (state, action) => {
      state.toggleCreatePost = action.payload;
    },
  },
});

export const { toggleCreatePost } = globleSplice.actions;

export default globleSplice.reducer;
