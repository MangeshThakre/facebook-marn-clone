import React from "react";
import "./Display.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { isDarkMode } from "../../../../redux/darkLight_mode.js";
import { useDispatch, useSelector } from "react-redux";
import { dark } from "@mui/material/styles/createPalette";

function Display({ setToggleDisplayAndAssibality }) {
  const dispatch = useDispatch();
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);

  const ICONCOLOR = useSelector((state) => state.darkLight.iconColor);

  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );

  let darkLightDefault;
  if (document.cookie) {
    darkLightDefault = document.cookie.split("=")[1];
  } else darkLightDefault = "off";

  function darkmodefun(mode) {
    if (mode === "on") {
      dispatch(isDarkMode("on"));
      document.cookie = "isDarkMode=on ; SameSite=None; Secure";
    } else if (mode === "off") {
      dispatch(isDarkMode("off"));
      document.cookie = "isDarkMode=off; SameSite=None; Secure";
    } else if (mode === "automatic") {
      document.cookie = "isDarkMode=automatic ; SameSite=None; Secure";
      const now = new Date().getHours();
      if (now >= 5 && now <= 18) {
        dispatch(isDarkMode("off"));
      } else {
        dispatch(isDarkMode("on"));
      }
    }
  }

  return (
    <div>
      <div className="moreDisplayHeader">
        <IconButton
          sx={{ marginRight: "30px" }}
          onClick={() => setToggleDisplayAndAssibality(false)}
        >
          <ArrowBackIcon sx={{ color: ICONCOLOR }} />
        </IconButton>
        <h2 style={{ color: FONTCOLOR }}>Display</h2>
      </div>
      <div className="moreDisplaybody">
        <div style={{ display: "flex", margin: "10px 0 10px" }}>
          <div style={{ margin: "5px 20px 5px 10px" }}>
            <NightlightRoundIcon sx={{ color: ICONCOLOR }} />
          </div>
          <div>
            <h4 style={{ color: FONTCOLOR }}> Dark Mode</h4>
            <p style={{ fontSize: "14px", color: ICONCOLOR }}>
              Adjust the appearance of Facebook to reduce glare and give your
              eyes a break.
            </p>
          </div>
        </div>
        <FormControl sx={{ width: "100%" }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={darkLightDefault}
            name="radio-buttons-group"
          >
            <div style={{ marginLeft: "50px", color: FONTCOLOR }}>
              <div className="DisplayredioButton">
                <p>Off</p>
                <FormControlLabel
                  control={<Radio />}
                  onClick={() => darkmodefun("off")}
                  value="off"
                />
              </div>
              <div className="DisplayredioButton">
                <p>On</p>
                <FormControlLabel
                  control={<Radio />}
                  onClick={() => darkmodefun("on")}
                  value="on"
                />
              </div>
              <div className="DisplayredioButton">
                <div>
                  <p>Autoamic</p>
                  <p style={{ fontSize: "14px", color: ICONCOLOR }}>
                    We'll actomaticaly adjust the display based on your device's
                    system setteings.
                  </p>
                </div>

                <FormControlLabel
                  control={<Radio />}
                  onClick={() => darkmodefun("automatic")}
                  value="automatic"
                />
              </div>
            </div>
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}

export default Display;
