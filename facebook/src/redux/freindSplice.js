import { createSlice } from "@reduxjs/toolkit";

export const freindSplice = createSlice({
  name: "freindSplice",

  initialState: {
    FriendHomePage: true,
    send_freindRequest: false,
    confirm_freindRequest: "",
    Reject_freindRequest: "",
  },

  reducers: {
    FriendHomePage: (state, action) => {
      state.FriendHomePage = action.payload;
    },
    send_freindRequest: (state, action) => {
      state.send_freindRequest = action.payload;
    },
    confirm_freindRequest: (state, action) => {
      state.confirm_freindRequest = action.payload;
    },
    Reject_freindRequest: (state, action) => {
      state.Reject_freindRequest = action.payload;
    },
  },
});

export const {
  FriendHomePage,
  send_freindRequest,
  confirm_freindRequest,
  Reject_freindRequest,
} = freindSplice.actions;

export default freindSplice.reducer;
