import { createSlice } from "@reduxjs/toolkit";

export const globleSplice = createSlice({
  name: "globle",

  initialState: {
    user: null,
    token: null,
    toggleCreatePost: false,
    togglePhotoVideo: false,
  },

  reducers: {
    token: (state, action) => {
      state.user = action.payload;
    },

    user: (state, action) => {
      state.user = action.payload;
    },
    toggleCreatePost: (state, action) => {
      state.toggleCreatePost = action.payload;
    },
    togglePhotoVideo: (state, action) => {
      state.togglePhotoVideo = action.payload;
    },
  },
});

export const { toggleCreatePost, togglePhotoVideo, token, user } =
  globleSplice.actions;

export default globleSplice.reducer;
