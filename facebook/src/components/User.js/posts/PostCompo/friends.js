import React from "react";
import Card from "@mui/material/Card";

import { Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { setPage } from "../../../../redux/userSplice.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import contact from "../../../../image/contact.png";
import "./friends.css";
import { useParams } from "react-router";
import axios from "axios";
import { color } from "@mui/system";
function Friends({ setPage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const [friendsData, setFriendsData] = useState([]);
  const [commanFriend, setCommanFriend] = useState([]);
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const { USERID } = useParams();

  useEffect(() => {
    fetchFriends(USERID);
  }, [USERID]);

  useEffect(() => {
    async function fetchFrinds() {
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
      } catch (error) {
        console.log("Error", error);
      }
    }
    fetchFrinds();
  }, []);

  async function fetchFriends(id, comment = "") {
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_friends?user_id=" + id + "&page=1&limit=6",
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
      <Card>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Friends</h3>
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
            {friendsData.length != 0
              ? friendsData.map((e, i) => {
                  const profile = e.profilePic
                    ? URL + "/" + e.profilePic
                    : contact;
                  return (
                    <div onClick={() => navigate("/user/" + e._id)}>
                      <img className="PostphotoBox" src={profile} alt="" />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          position: "relative",
                        }}
                      >
                        <p style={{ margin: "3px 0  0 5px" }}>{e.userName}</p>

                        {commanFriend.some(({ _id: di1 }) => di1 == e._id) &&
                        USERID != USER.id ? (
                          <p className="commanFriend">Friend</p>
                        ) : null}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Friends;
