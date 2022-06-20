import React from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { Button } from "@mui/material";
import contact from "../../../image/contact.png";
import { useRef, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./freindUser.css";
import { useSelector } from "react-redux";
import FreindUserBox from "./freindUserBox";
import Divider from "@mui/material/Divider";
// import { useCallbackRef } from "use-callback-ref";
function Friends() {
  const { USERID } = useParams();
  const observer = useRef();
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [freindsData, setFriendsData] = useState([]);
  const [isFreindLoading, setIsFreindLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);
  const ICONCOLOR = useSelector((state) => state.darkLight.iconColor);
  const BACKGROUNDCOLOR_SUB_FANT = useSelector(
    (state) => state.darkLight.backgroundColor_sub_fant
  );

  useEffect(() => {
    fetchFrinds();
  }, []);

  const lastFriendRef = useCallback(
    (node) => {
      if (isFreindLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (nextPage) {
            fetchFrinds();
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFreindLoading]
  );
  const updatedText = debounce((text) => {
    fetchFrinds(text);
  });

  function debounce(cb, delay = 1000) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  async function fetchFrinds(text = "") {
    setIsFreindLoading(true);
    try {
      const response = await axios({
        method: "get",
        url:
          URL +
          "/api/get_friends?user_id=" +
          USERID +
          "&page=" +
          page +
          "&limit=3&match=" +
          text,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      if (response.data.next) {
        setNextPage(true);
        setPage(response.data.next.page);
      } else setNextPage(false);
      setFriendsData([...freindsData, ...data.data]);
      setIsFreindLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div style={{ width: "1186px", marginBottom: "20px" }}>
      <Card sx={{ borderRadius: "7px", backgroundColor: SUB_BACKGROUND_COLOR }}>
        <CardContent>
          <div>
            <div className="userFreindHeader">
              <h3 style={{ color: FONTCOLOR }}>Friends</h3>
              <div
                className="search"
                id="search"
                style={{ backgroundColor: BACKGROUNDCOLOR_SUB_FANT }}
              >
                <SearchIcon sx={{ marginLeft: "5px", color: ICONCOLOR }} />
                <input
                  type="text"
                  placeholder="Search Facebook"
                  onChange={(e) => {
                    setPage(1);
                    setFriendsData([]);
                    updatedText(e.target.value);
                  }}
                  style={{
                    color: ICONCOLOR,
                    backgroundColor: BACKGROUNDCOLOR_SUB_FANT,
                  }}
                />
              </div>
            </div>

            <Divider variant="middle" />

            <div className="userFreindBody">
              {freindsData.length != 0 ? (
                freindsData.map((e, i) => {
                  if (freindsData.length === i + 1) {
                    return (
                      <div ref={lastFriendRef} key={i}>
                        <FreindUserBox e={e} />;
                      </div>
                    );
                  } else return <FreindUserBox key={i} e={e} />;
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
