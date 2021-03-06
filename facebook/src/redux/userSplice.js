import { createSlice } from "@reduxjs/toolkit";

export const userSplice = createSlice({
  name: "globle",

  initialState: {
    userDetail: null,
    homeTown: {},
    currentCity: {},
    workPlace: [],
    college: [],
    school: [],
    familyMember: [],
    setPage: "POST",
    profilePicture: "",
    profileCover: "",
    bio: "",
    relationship: {},
    created_at: {},
  },

  reducers: {
    userDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    bio: (state, action) => {
      state.bio = action.payload;
    },
    created_at: (state, action) => {
      state.created_at = action.payload;
    },

    relationship: (state, action) => {
      state.relationship = action.payload;
    },
    homeTown: (state, action) => {
      action.payload
        ? (state.homeTown = action.payload)
        : (state.homeTown = {});
    },
    currentCity: (state, action) => {
      action.payload
        ? (state.currentCity = action.payload)
        : (state.currentCity = {});
    },
    workPlace: (state, action) => {
      action.payload
        ? (state.workPlace = action.payload)
        : (state.workPlace = []);
    },
    college: (state, action) => {
      action.payload ? (state.college = action.payload) : (state.college = []);
    },
    school: (state, action) => {
      action.payload ? (state.school = action.payload) : (state.school = []);
    },
    familyMember: (state, action) => {
      action.payload
        ? (state.familyMember = action.payload)
        : (state.school = []);
    },

    setPage: (state, action) => {
      state.setPage = action.payload;
    },
    profilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    profileCover: (state, action) => {
      state.profileCover = action.payload;
    },
  },
});

export const {
  setPage,
  currentCity,
  homeTown,
  userDetail,
  workPlace,
  college,
  school,
  created_at,
  familyMember,
  profilePicture,
  profileCover,
  bio,
  relationship,
} = userSplice.actions;

export default userSplice.reducer;
