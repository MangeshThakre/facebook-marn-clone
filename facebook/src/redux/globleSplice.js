import { createSlice } from "@reduxjs/toolkit";

export const globleSplice = createSlice({
  name: "globle",

  initialState: {
    toggleCreatePost: false,
    togglePhotoVideo: false,
  },

  reducers: {
    toggleCreatePost: (state, action) => {
      state.toggleCreatePost = action.payload;
    },
    togglePhotoVideo: (state, action) => {
      state.togglePhotoVideo = action.payload;
    },
  },
});

export const { toggleCreatePost, togglePhotoVideo } = globleSplice.actions;

export default globleSplice.reducer;
