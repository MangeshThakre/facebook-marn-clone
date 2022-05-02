import { configureStore } from "@reduxjs/toolkit";
import iconReducer from "../redux/icons.js";
import darkLight from "../redux/darkLight_mode.js";
import globle from "../redux/globleSplice.js";

export default configureStore({
  reducer: { icon: iconReducer, darkLight, globle },
});
