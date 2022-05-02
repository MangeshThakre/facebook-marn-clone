import React from "react";
import "./navBar.css";
import facebook from "../../image/Facebook.png";
import Middle from "./middle";
import Right from "./right";
import { useNavigate } from "react-router";
import {
  isDarkMode,
  backgroundColor,
  iconColor,
  backgroundColor_sub,
} from "../../redux/darkLight_mode.js";
import { useSelector, useDispatch } from "react-redux";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  const burgerMenu = useSelector((state) => state.icon.burgerMenu);

  return (
    <div className="navbar" style={{ backgroundColor: SUB_BACKGROUND_COLOR }}>
      <div className="navBarLeft">
        <img
          src={facebook}
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="search" id="search">
          <input type="text" placeholder="Search Facebook" />
        </div>
        <div className="burgerMenuLeft" id="burgerMenuLeft">
          <svg
            viewBox="0 0 28 28"
            fill="currentColor"
            height="20"
            width="20"
            color={iconColor}
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
