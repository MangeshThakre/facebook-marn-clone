import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { setPage } from "../../../../redux/userSplice.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import contact from "../../../../image/contact.png";
import "./friends.css";
import { useParams } from "react-router";
import axios from "axios";
function Friends({ setPage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [friendsData, setFriendsData] = useState([]);
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const { USERID } = useParams();

  useEffect(() => {
    fetchFriends();
  }, [USERID]);

  async function fetchFriends() {
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_friends?user_id=" + USERID + "&page=1&limit=9",
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

  console.log(friendsData);

  return (
    <div className="friend">
      <Card>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Photos</h3>
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
                      <p style={{ margin: "3px 0  0 5px" }}>{e.userName}</p>
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
