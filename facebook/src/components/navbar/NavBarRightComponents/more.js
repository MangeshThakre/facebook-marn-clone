import React from "react";
import "./more.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useSelector, useDispatch } from "react-redux";
import contact from "../../../image/contact.png";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { user } from "../../../redux/globleSplice.js";
import { useNavigate } from "react-router-dom";
import Display from "./displayAndAssibality/Display";

function More() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const URL = process.env.REACT_APP_API_URL;
  const ICONCOLOR = useSelector((state) => state.darkLight.iconColor);
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);
  const ISDARK = useSelector((state) => state.darkLight.isDarkMode);
  const [toggleDisplayAndAssibality, setToggleDisplayAndAssibality] =
    useState(false);

  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );

  const ProfilePic = USER.profilePic ? URL + "/" + USER.profilePic : "";

  function handleLogOut() {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("LOCALUSER");
    dispatch(user(null));
    navigate("/signin");
  }

  return (
    <div className="navebarRightMore">
      <Card sx={{ backgroundColor: SUB_BACKGROUND_COLOR }}>
        <CardContent>
          {toggleDisplayAndAssibality ? (
            <Display
              setToggleDisplayAndAssibality={setToggleDisplayAndAssibality}
            />
          ) : (
            <div>
              <div
                className="userProfile"
                onClick={() => navigate("/user/" + USER.id)}
              >
                <img src={ProfilePic ? ProfilePic : contact} alt="" />
                <div>
                  <p style={{ color: FONTCOLOR }}>
                    <b>{USER.firstName + " " + USER.lastName}</b>
                  </p>
                  <p style={{ fontSize: "13px", color: "gray" }}>
                    See your Profile
                  </p>
                </div>
              </div>
              <Divider variant="middle" />
              <div
                className={
                  ISDARK === "on"
                    ? "NavbarRightOprionButtons" + ISDARK
                    : "NavbarRightOprionButtons"
                }
              >
                <div
                  className="DisplayAndAssibality"
                  onClick={() => setToggleDisplayAndAssibality(true)}
                >
                  <div>
                    <NightlightRoundIcon
                      sx={{ margin: "0 10px 0 10px", color: ICONCOLOR }}
                    />
                    <p style={{ color: FONTCOLOR }}> Display & Accessibility</p>
                  </div>
                  <div>
                    <ArrowForwardIosIcon sx={{ color: ICONCOLOR }} />
                  </div>
                </div>
                <div className="logout" onClick={() => handleLogOut()}>
                  <LogoutIcon
                    sx={{ margin: "0 10px 0 10px", color: ICONCOLOR }}
                  />
                  <p style={{ color: FONTCOLOR }}>Logout</p>
                </div>
              </div>
              <div>
                <p style={{ fontSize: "13px", color: "gray" }}>
                  Privacy · Terms · Advertising · Ad Choices · Cookies Clone ©
                  2022
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default More;
