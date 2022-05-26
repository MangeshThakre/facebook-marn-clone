import { createSlice } from "@reduxjs/toolkit";

export const userSplice = createSlice({
  name: "globle",

  initialState: {
    userDetail: null,
    homeTown: { city: "", type: "" },
    currentCity: { city: "", type: "" },
    setPage: "POST",
  },

  reducers: {
    userDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    homeTown: (state, action) => {
      state.homeTown = action.payload;
    },
    currentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setPage: (state, action) => {
      state.setPage = action.payload;
    },
  },
});

export const { setPage, currentCity, homeTown, userDetail } =
  userSplice.actions;

export default userSplice.reducer;
