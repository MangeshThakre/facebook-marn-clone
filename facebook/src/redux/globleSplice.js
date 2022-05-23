import { createSlice } from "@reduxjs/toolkit";

export const globleSplice = createSlice({
  name: "globle",

  initialState: {
    user: null,
    token: null,
    toggleCreatePost: false,
    togglePhotoVideo: false,
    toggleAboutPopUp: false,
    posts: [],
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
    toggleAboutPopUp: (state, action) => {
      state.toggleAboutPopUp = action.payload;
    },
    posts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const {
  toggleCreatePost,
  togglePhotoVideo,
  toggleAboutPopUp,
  token,
  user,
  posts,
} = globleSplice.actions;

export default globleSplice.reducer;
