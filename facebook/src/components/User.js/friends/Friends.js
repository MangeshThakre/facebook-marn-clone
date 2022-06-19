import React from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { Button } from "@mui/material";
import contact from "../../../image/contact.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./freindUser.css";
import FreindUserBox from "./freindUserBox";
import Divider from "@mui/material/Divider";
function Friends() {
  const { USERID } = useParams();

  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const [freindsData, setFriendsData] = useState([]);

  useEffect(() => {
    fetchFrinds();
  }, []);

  async function fetchFrinds() {
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_friends?user_id=" + USERID + "&page=1&limit=6",
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

  return (
    <div style={{ width: "1186px", marginBottom: "20px" }}>
      <Card sx={{ borderRadius: "7px" }}>
        <CardContent>
          <div>
            <div className="userFreindHeader">
              <h3>Friends</h3>
              <div className="search" id="search">
                <SearchIcon sx={{ marginLeft: "5px", color: "#6d6e6f" }} />
                <input type="text" placeholder="Search Facebook" />
              </div>
            </div>

            <Divider variant="middle" />

            <div className="userFreindBody">
              {freindsData.length != 0 ? (
                freindsData.map((e, i) => {
                  return <FreindUserBox key={i} e={e} />;
                })
              ) : (
                <p>no freinds</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Friends;
