import React, { useEffect } from "react";
import contact from "../../image/contact.png";
import "./navBar.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import More from "./NavBarRightComponents/more.js";
import { deshbordPage } from "../../redux/globleSplice.js";

function Right() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleMessage, setToggleMessage] = useState(false);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [toggleMore, setToggleMore] = useState(false);
  const menu = useSelector((state) => state.icon.burgerMenu);
  const messanger = useSelector((state) => state.icon.messanger);
  const notification = useSelector((state) => state.icon.notification);
  const more = useSelector((state) => state.icon.more);
  const iconColor = useSelector((state) => state.darkLight.iconColor);
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const URL = process.env.REACT_APP_API_URL;
  const ProfilePic = USER?.profilePic ? URL + "/" + USER.profilePic : "";
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);

  const navRight = useRef(null);
  const BACKGROUNDCOLOR_SUB_FANT = useSelector(
    (state) => state.darkLight.backgroundColor_sub_fant
  );

  // more pop-up//

  document.addEventListener("click", function (event) {
    if (event.target.closest(".navebarRightMore")) return;
    if (event.target.closest(".activeButton")) return;
    if (event.target.closest(".DisplayAndAssibality")) return;
    if (event.target.closest(".moreDisplayHeader")) return;
    if (toggleMore) return;
    setToggleMore(false);
  });
  useEffect(() => {
    if (!toggleMore) {
      navRight.current.childNodes.forEach((e) => {
        e.className = "";
      });
    }
  }, [toggleMore]);

  //

  return (
    <div className="navBarRight" ref={navRight}>
      <div
        onClick={(e) => {
          navigate("/user/" + USER.id);
          dispatch(deshbordPage(""));
        }}
      >
        <div
          className="user"
          style={{ backgroundColor: BACKGROUNDCOLOR_SUB_FANT }}
        >
          <img src={ProfilePic ? ProfilePic : contact} alt="" />
          <p style={{ color: FONTCOLOR }}>
            <b>{USER?.firstName}</b>
          </p>
        </div>
      </div>

      <div
        // className="button"
        // style={{ backgroundColor: BACKGROUNDCOLOR_SUB_FANT }}
        onClick={(e) => {
          const allElement = navRight.current.childNodes;
          for (const element of allElement) {
            element.className = "";
          }
          setToggleNotification(false);
          setToggleMore(false);
          setToggleMessage(false);
          setToggleMenu(!toggleMenu);
          !toggleMenu
            ? (e.currentTarget.className = "activeButton")
            : (e.currentTarget.className = "");
        }}
      >
        <div
          className="menu button"
          style={{ backgroundColor: BACKGROUNDCOLOR_SUB_FANT }}
        >
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
      </div>
      <div
        onClick={(e) => {
          const allElement = navRight.current.childNodes;
          for (const element of allElement) {
            element.className = "";
          }
          setToggleMenu(false);
          setToggleNotification(false);
          setToggleMore(false);
          setToggleMessage(!toggleMessage);
          !toggleMessage
            ? (e.currentTarget.className = "activeButton")
            : (e.currentTarget.className = "");
        }}
      >
        <div
          className="messanger button"
          style={{ backgroundColor: BACKGROUNDCOLOR_SUB_FANT }}
        >
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
      </div>
      <div
        onClick={(e) => {
          const allElement = navRight.current.childNodes;
          for (const element of allElement) {
            element.className = "";
          }
          setToggleMenu(false);
          setToggleMore(false);
          setToggleMessage(false);
          setToggleNotification(!toggleNotification);
          !toggleNotification
            ? (e.currentTarget.className = "activeButton")
            : (e.currentTarget.className = "");
        }}
      >
        <div
          className="notification button"
          style={{ backgroundColor: BACKGROUNDCOLOR_SUB_FANT }}
        >
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
      </div>
      <div
        onClick={(e) => {
          // popup(e);
          const allElement = navRight.current.childNodes;
          for (const element of allElement) {
            element.className = "";
          }
          setToggleMenu(false);
          setToggleMessage(false);
          setToggleNotification(false);
          setToggleMore(!toggleMore);

          !toggleMore
            ? (e.currentTarget.className = "activeButton")
            : (e.currentTarget.className = "");
        }}
      >
        <div
          className="more button"
          style={{ backgroundColor: BACKGROUNDCOLOR_SUB_FANT }}
        >
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
      <div>{toggleMore ? <More /> : null}</div>
    </div>
  );
}

export default Right;
