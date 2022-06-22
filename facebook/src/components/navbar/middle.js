import React from "react";
import "./navBar.css";
import { deshbordPage } from "../../redux/globleSplice.js";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FriendHomePage } from "../../redux/freindSplice.js";
function Middle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const home = useSelector((state) => state.icon.home);
  const people = useSelector((state) => state.icon.people);
  const reel = useSelector((state) => state.icon.reel);
  const market = useSelector((state) => state.icon.market);
  const discover = useSelector((state) => state.icon.discover);
  const iconColor = useSelector((state) => state.darkLight.iconColor);
  const burgerMenu = useSelector((state) => state.icon.burgerMenu);
  const DESHBORDPAGE = useSelector((state) => state.globle.deshbordPage);
  const ISDARK = useSelector((state) => state.darkLight.isDarkMode);

  const navBarMiddle = useRef(null);

  useEffect(() => {
    const allElement = navBarMiddle.current.childNodes;

    for (const element of allElement) {
      const className = element.className.split(" ");
      element.className = className[0];
      if (className[0] == DESHBORDPAGE) {
        element.className = DESHBORDPAGE + " activee";
      }
    }
  }, [DESHBORDPAGE]);

  return (
    <div
      className={ISDARK === "on" ? "navBarMiddle" + ISDARK : "navBarMiddle"}
      ref={navBarMiddle}
    >
      <div
        className="HOME activee"
        onClick={(e) => {
          navigate("/");
          dispatch(deshbordPage("HOME"));
        }}
      >
        <div id="home">
          <svg
            className="icon"
            viewBox="0 0 28 28"
            fill="currentColor"
            height="28"
            width="28"
            color={iconColor}
          >
            <path d={home} />
          </svg>
        </div>
      </div>

      <div
        className="FRIENDS"
        onClick={(e) => {
          navigate("/friends");
          dispatch(deshbordPage("FRIENDS"));
          dispatch(FriendHomePage(true));
        }}
      >
        <div id="people">
          <svg
            viewBox="0 0 28 28"
            fill="currentColor"
            height="28"
            width="28"
            color={iconColor}
          >
            <path d={people} />
          </svg>
        </div>
      </div>

      <div className="REEL" onClick={(e) => dispatch(deshbordPage("REEL"))}>
        <div id="reel">
          <svg
            viewBox="0 0 28 28"
            fill="currentColor"
            height="28"
            width="28"
            color={iconColor}
          >
            <path d={reel} />
          </svg>
        </div>
      </div>

      <div className="MARKET" onClick={(e) => dispatch(deshbordPage("MARKET"))}>
        <div id="market">
          <svg
            viewBox="0 0 28 28"
            fill="currentColor"
            height="28"
            width="28"
            color={iconColor}
          >
            <path d={market} />
          </svg>
        </div>
      </div>

      <div
        className="DISCOVER"
        onClick={(e) => dispatch(deshbordPage("DISCOVER"))}
      >
        <div id="discover">
          <svg
            viewBox="0 0 28 28"
            fill="currentColor"
            height="28"
            width="28"
            color={iconColor}
          >
            <path d={discover} />
          </svg>
        </div>
      </div>

      <div
        className="BURBERMENU"
        onClick={(e) => dispatch(deshbordPage("BURBERMENU"))}
      >
        <div id="burgerMenu">
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
    </div>
  );
}

export default Middle;
