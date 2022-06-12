import React from "react";
import "../homePageLeft/homePageLeft.css";
import contact from "../../../image/contact.png";
import findFriends from "../../../image/findFriends.png";
import groups from "../../../image/homePageLeftGroup.png";
import weather from "../../../image/homePageLeftWeather.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FriendHomePage } from "../../../redux/freindSplice.js";
import { deshbordPage } from "../../../redux/globleSplice.js";
function HomePageLeft() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));

  const URL = process.env.REACT_APP_API_URL;

  const ProfilePic = USER?.profilePic ? URL + "/" + USER.profilePic : "";

  return (
    <div className="homePageLeftOptions">
      <div
        className="userProfile"
        onClick={() => {
          navigate("/user/" + USER.id);
        }}
      >
        <div>
          <img src={ProfilePic ? ProfilePic : contact} alt="contact" />
          <p> {USER?.firstName + " " + USER?.lastName}</p>
        </div>
      </div>
      <div
        className="findFriends"
        onClick={() => {
          navigate("/friends");
          dispatch(deshbordPage("FRIENDS"));
          dispatch(FriendHomePage(true));
        }}
      >
        <div>
          <img src={findFriends} alt="contact" />
          <p> Find freinds</p>
        </div>
      </div>
      <div className="Groups">
        <div>
          <img src={groups} alt="contact" />
          <p> Groups</p>
        </div>
      </div>
      <div className="weather">
        <div>
          <img src={weather} alt="contact" />
          <p> Weather</p>
        </div>
      </div>
    </div>
  );
}

export default HomePageLeft;
