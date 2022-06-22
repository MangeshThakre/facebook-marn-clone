import React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import contact from "../../../../image/contact.png";
import "./friends.css";
import { useParams } from "react-router";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
function Friends({ setPage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const [friendsData, setFriendsData] = useState([]);
  const [commanFriend, setCommanFriend] = useState([]);
  const [isCommanFriendLoading, setIsCommanFrindLoading] = useState(false);
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const { USERID } = useParams();
  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);
  const ICONCOLOR = useSelector((state) => state.darkLight.iconColor);

  useEffect(() => {
    fetchFriends(USERID);
  }, [USERID]);

  useEffect(() => {
    fetchFrinds();
  }, []);
  async function fetchFrinds() {
    setIsCommanFrindLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_friends?user_id=" + USER.id + "&page=1&limit=6",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data.data;
      setCommanFriend(data);
      setIsCommanFrindLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function fetchFriends(id) {
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_friends?user_id=" + id + "&page=1&limit=6&match=",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data.data;
      setFriendsData(data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  function commonFriend(e) {
    if (USER.id != USERID) {
      commanFriend.forEach((element) => {
        if (element._id == e._id) {
          return <p className="commanFriend">Friend</p>;
        } else return null;
      });
    }
  }

  return (
    <div className="friend">
      <Card
        sx={{ borderRadius: "10px", backgroundColor: SUB_BACKGROUND_COLOR }}
      >
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ color: FONTCOLOR }}>Friends</h3>
            <div
              className="Freind_button"
              onClick={() => dispatch(setPage("FRIENDS"))}
            >
              <div>
                <p> See all Freinds</p>
              </div>
            </div>
          </div>
          <div className="PostfriendBody">
            {isCommanFriendLoading ? (
              <div>
                <Skeleton
                  variant="rectangular"
                  width={120}
                  height={110}
                  sx={{ bgcolor: "grey.200", margin: " 5px 0 0 12px " }}
                />
                <Skeleton
                  variant="rectangular"
                  width={50}
                  height={15}
                  sx={{ bgcolor: "grey.200", margin: " 5px 0 0 12px " }}
                />
              </div>
            ) : friendsData.length != 0 ? (
              friendsData.map((e, i) => {
                const profile = e.profilePic
                  ? URL + "/" + e.profilePic
                  : contact;
                return (
                  <div key={i} onClick={() => navigate("/user/" + e._id)}>
                    <img className="PostphotoBox" src={profile} alt="" />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        position: "relative",
                      }}
                    >
                      <p style={{ margin: "3px 0  0 5px", color: ICONCOLOR }}>
                        {e.userName}
                      </p>

                      {commanFriend.some(({ _id: di1 }) => di1 == e._id) &&
                      USERID != USER.id ? (
                        <p className="commanFriend">Friend</p>
                      ) : null}
                    </div>
                  </div>
                );
              })
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Friends;
