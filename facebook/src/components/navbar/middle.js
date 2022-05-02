import React from "react";
import { useSelector } from "react-redux";
function Middle() {
  const home = useSelector((state) => state.icon.home);
  const people = useSelector((state) => state.icon.people);
  const reel = useSelector((state) => state.icon.reel);
  const market = useSelector((state) => state.icon.market);
  const discover = useSelector((state) => state.icon.discover);
  const iconColor = useSelector((state) => state.darkLight.iconColor);
  const burgerMenu = useSelector((state) => state.icon.burgerMenu);

  return (
    <div className="navBarMiddle">
      <div className="home" id="home">
        <svg
          viewBox="0 0 28 28"
          fill="blue"
          height="28"
          width="28"
          color={iconColor}
        >
          <path d={home} />
        </svg>
      </div>
      <div className="people" id="people">
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
      <div className="reel" id="reel">
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
      <div className="market" id="market">
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
      <div id="discover" className="discover">
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
      <div className="burgerMenu" id="burgerMenu">
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
  );
}

export default Middle;
