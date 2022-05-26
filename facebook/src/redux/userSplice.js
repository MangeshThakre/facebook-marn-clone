import { createSlice } from "@reduxjs/toolkit";

export const userSplice = createSlice({
  name: "globle",

  initialState: {
    userDetail: null,
    homeTown: {},
    currentCity: {},
    setPage: "POST",
  },

  reducers: {
    userDetail: (state, action) => {
      state.userDetail = action.payload;
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
    setPage: (state, action) => {
      state.setPage = action.payload;
    },
  },
});

export const { setPage, currentCity, homeTown, userDetail } =
  userSplice.actions;

export default userSplice.reducer;
