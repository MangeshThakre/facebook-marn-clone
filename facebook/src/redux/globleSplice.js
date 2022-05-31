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
    postUpdate: {},
    UpdatedPost: {},
    togglePostDelete: false,
    deletePostId: "",
    ActualdeletePostId: "",
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
    postUpdate: (state, action) => {
      state.postUpdate = action.payload;
    },
    UpdatedPost: (state, action) => {
      state.UpdatedPost = action.payload;
    },
    togglePostDelete: (state, action) => {
      state.togglePostDelete = action.payload;
    },
    deletePostId: (state, action) => {
      state.deletePostId = action.payload;
    },
    ActualdeletePostId: (state, action) => {
      state.ActualdeletePostId = action.payload;
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
  postUpdate,
  UpdatedPost,
  togglePostDelete,
  deletePostId,
  ActualdeletePostId,
} = globleSplice.actions;

export default globleSplice.reducer;
