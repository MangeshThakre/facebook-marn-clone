import { createSlice } from "@reduxjs/toolkit";

export const darkLightMode = createSlice({
  name: "darkLightMode",
  initialState: {
    isDarkMode: "off",
    backgroundColor: "#f0f2f5",
    backgroundColor_sub: "#ffffff",
    iconColor: "#65676b",
    fontColor: "#242526",
    backgroundColor_sub_fant: "#f0f2f5",

    // backgroundColor_sub: "#242526",
    // backgroundColor: "#18191a",
    // iconColor: "#b0b3b8",
    // fontColor: "#ffffff",
    // backgroundColor_sub_fant: "#3a3b3c",
  },
  reducers: {
    isDarkMode: (state, action) => {
      if (action.payload == "on") {
        state.isDarkMode = "on";
        state.backgroundColor = "#18191a";
        state.backgroundColor_sub = "#242526";
        state.iconColor = "#b0b3b8";
        state.backgroundColor_sub_fant = "#3a3b3c";
        state.fontColor = "#E4E6EB";
      } else {
        state.isDarkMode = "off";
        state.backgroundColor = "#f0f2f5";
        state.backgroundColor_sub = "#ffffff";
        state.iconColor = "#65676b";
        state.fontColor = "#242526";
        state.backgroundColor_sub_fant = "#f0f2f5";
      }
    },

    backgroundColor: (state, action) => {
      if (!action.payload) {
        state.backgroundColor = "#ffffff";
      } else {
        state.backgroundColor = "#18191a";
      }
    },

    backgroundColor_sub: (state, action) => {
      if (!action.payload) {
        state.backgroundColor_sub = "#f0f2f5";
      } else {
        state.backgroundColor_sub = "#242526";
      }
    },

    iconColor: (state, action) => {
      if (action.payload) {
        state.iconColor = "#b0b3b8";
      } else {
        state.iconColor = "#65676b";
      }
    },
    backgroundColor_sub_fant: (state, action) => {
      if (action.payload) {
        state.backgroundColor_sub_fant = "#f0f2f5";
      } else {
        state.backgroundColor_sub_fant = "#3a3b3c";
      }
    },
  },
});

export const {
  isDarkMode,
  backgroundColor,
  iconColor,
  backgroundColor_sub,
  backgroundColor_sub_fant,
} = darkLightMode.actions;

export default darkLightMode.reducer;
