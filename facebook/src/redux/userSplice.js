import { createSlice } from "@reduxjs/toolkit";

export const userSplice = createSlice({
  name: "globle",

  initialState: {
    setPage: "POST",
  },

  reducers: {
    setPage: (state, action) => {
      state.setPage = action.payload;
    },
  },
});

export const { setPage } = userSplice.actions;

export default userSplice.reducer;
