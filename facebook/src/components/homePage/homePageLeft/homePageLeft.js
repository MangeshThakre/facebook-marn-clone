import React from "react";
import "../homePageLeft/homePageLeft.css";
import contact from "../../../image/contact.png";
import findFriends from "../../../image/findFriends.png";
import groups from "../../../image/homePageLeftGroup.png";
import weather from "../../../image/homePageLeftWeather.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function HomePageLeft() {
  const navigate = useNavigate();
  const USER = useSelector((state) => state.globle.user);

  return (
    <div className="homePageLeftOptions">
      <div
        className="userProfile"
        onClick={() => {
          navigate("/user");
        }}
      >
        <div>
          <img src={contact} alt="contact" />
          <p> {USER?.firstName + " " + USER?.lastName}</p>
        </div>
      </div>
      <div
        className="findFriends"
        onClick={() => {
          navigate("/friends");
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
