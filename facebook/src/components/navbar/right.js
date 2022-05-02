import React from "react";
import contact from "../../image/contact.png";
import "./navBar.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Right() {
  const navigate = useNavigate();
  const menu = useSelector((state) => state.icon.burgerMenu);
  const messanger = useSelector((state) => state.icon.messanger);
  const notification = useSelector((state) => state.icon.notification);
  const more = useSelector((state) => state.icon.more);
  const iconColor = useSelector((state) => state.darkLight.iconColor);

  return (
    <div className="navBarRight">
      <span
        className="user"
        onClick={() => {
          navigate("/user");
        }}
      >
        <img src={contact} alt="" />
        <p>name</p>
      </span>

      <div className="menu">
        <svg
          viewBox="0 0 28 28"
          fill="currentColor"
          height="20"
          width="20"
          color={iconColor}
        >
          <path d={menu} />
        </svg>
      </div>
      <div className="messanger">
        <svg
          viewBox="0 0 28 28"
          fill="currentColor"
          height="20"
          width="20"
          color={iconColor}
        >
          <path d={messanger} />
        </svg>
      </div>
      <div className="notification">
        <svg
          viewBox="0 0 28 28"
          fill="currentColor"
          height="20"
          width="20"
          color={iconColor}
        >
          <path d={notification} />
        </svg>
      </div>
      <div className="more">
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          height="1rem"
          width="1rem"
          color={iconColor}
        >
          <path d={more} />
        </svg>
      </div>
    </div>
  );
}

export default Right;
