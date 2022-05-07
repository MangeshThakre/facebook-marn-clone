import React from "react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./navBar.css";
function Middle() {
  const home = useSelector((state) => state.icon.home);
  const people = useSelector((state) => state.icon.people);
  const reel = useSelector((state) => state.icon.reel);
  const market = useSelector((state) => state.icon.market);
  const discover = useSelector((state) => state.icon.discover);
  const iconColor = useSelector((state) => state.darkLight.iconColor);
  const burgerMenu = useSelector((state) => state.icon.burgerMenu);
  const activeColor = "blue";

  const navBarMiddle = useRef(null);
  const selectPage = (e) => {
    const target = e.currentTarget.parentNode;
    const allElement = document.querySelector(".navBarMiddle").childNodes;
    for (const element of allElement) {
      element.className = "";
    }
    target.className = "activee";
  };

  return (
    <div className="navBarMiddle" ref={navBarMiddle}>
      <div className="activee">
        <div className="home " id="home" onClick={(e) => selectPage(e)}>
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

      <div>
        <div className="people" id="people" onClick={(e) => selectPage(e)}>
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

      <div>
        <div className="reel" id="reel" onClick={(e) => selectPage(e)}>
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

      <div>
        <div className="market" id="market" onClick={(e) => selectPage(e)}>
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

      <div>
        <div id="discover" className="discover" onClick={(e) => selectPage(e)}>
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

      <div>
        <div
          className="burgerMenu"
          id="burgerMenu"
          onClick={(e) => selectPage(e)}
        >
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
