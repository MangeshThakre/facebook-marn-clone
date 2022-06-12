import { createSlice } from "@reduxjs/toolkit";

export const freindSplice = createSlice({
  name: "freindSplice",

  initialState: {
    FriendHomePage: true,
  },

  reducers: {
    FriendHomePage: (state, action) => {
      state.FriendHomePage = action.payload;
    },
  },
});

export const { FriendHomePage } = freindSplice.actions;

export default freindSplice.reducer;
