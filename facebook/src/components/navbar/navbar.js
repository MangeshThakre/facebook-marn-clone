import React from "react";
import "./navBar.css";
import facebook from "../../image/Facebook.png";
import Middle from "./middle";
import Right from "./right";
import { useNavigate } from "react-router";
import { isDarkMode } from "../../redux/darkLight_mode.js";
import { deshbordPage } from "../../redux/globleSplice.js";
import { useSelector, useDispatch } from "react-redux";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  const BACKGROUNDCOLOR_SUB_FANT = useSelector(
    (state) => state.darkLight.backgroundColor_sub_fant
  );
  const ICONCOLOR = useSelector((state) => state.darkLight.iconColor);
  const burgerMenu = useSelector((state) => state.icon.burgerMenu);

  if (document.cookie) {
    const mode = document.cookie.split("=")[1];
    if (mode === "on") {
      dispatch(isDarkMode("on"));
    } else if (mode === "off") {
      dispatch(isDarkMode("off"));
    } else if (mode === "automatic") {
      const now = new Date().getHours();
      if (now >= 5 && now <= 18) {
        dispatch(isDarkMode("off"));
      } else {
        dispatch(isDarkMode("on"));
      }
    }
  } else dispatch(isDarkMode("off"));

  return (
    <div className="navbar" style={{ backgroundColor: SUB_BACKGROUND_COLOR }}>
      <div className="navBarLeft">
        <div
          onClick={() => {
            navigate("/");
            dispatch(deshbordPage("HOME"));
          }}
        >
          <img src={facebook} />
        </div>
        <div
          className="search"
          id="search"
          style={{ backgroundColor: BACKGROUNDCOLOR_SUB_FANT }}
        >
          <input
            type="text"
            placeholder="Search Facebook"
            style={{
              backgroundColor: BACKGROUNDCOLOR_SUB_FANT,
              color: ICONCOLOR,
            }}
          />
        </div>
        <div className="burgerMenuLeft" id="burgerMenuLeft">
          <svg
            viewBox="0 0 28 28"
            fill="currentColor"
            height="20"
            width="20"
            color={ICONCOLOR}
          >
            <path d={burgerMenu} />
          </svg>
        </div>
      </div>

      <div className="middle">
        <Middle />
      </div>

      <div className="right"></div>
      <Right />
    </div>
  );
}

export default Navbar;
