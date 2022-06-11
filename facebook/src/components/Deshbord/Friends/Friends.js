import React from "react";
import "./Friends.css";
import Navbar from "../../navbar/navbar.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "@mui/material";
import { user } from "../../../redux/globleSplice.js";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FriendSideBarMenu from "./friendSideBarMenu/FriendSideBarMenu";
import FriendsHome from "./FriendsMainBody/FriendsHome";
function Friends() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const USER = useSelector((state) => state.globle.user);
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const backgroundColor = useSelector(
    (state) => state.darkLight.backgroundColor
  );

  const backgroundColor_sub = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    if (USER != null) return;
    setIsLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/verify",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      dispatch(user(data));
      setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
      navigate("/signin");
    }
  };

  return (
    <div
      className="friends"
      style={{ height: "100%", backgroundColor: backgroundColor }}
    >
      {isLoading ? (
        "...loading"
      ) : (
        <>
          <Navbar />
          <div className="friendsBody">
            <FriendSideBarMenu />
            <div className="friendsRight">
              <div className="friendMainBody">
                <FriendsHome />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Friends;
