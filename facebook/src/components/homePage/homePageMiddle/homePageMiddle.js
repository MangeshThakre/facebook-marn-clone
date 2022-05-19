import React from "react";
import "../homePageMiddle/homePageMiddle.css";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import contact from "../../../image/contact.png";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Create from "../../User.js/posts/PostCompo/create.js";
import PostMaker from "../../User.js/posts/PostCompo/PostMaker";
import { useSelector } from "react-redux";
import axios from "axios";
function HomePageMiddle() {
  const [toggleStory, setToggleStory] = useState(false);
  const [postDetail, setPostDetails] = useState([]);
  const [isFetchPostLoading, setIsFetchPostLoading] = useState(false);
  const URL = process.env.REACT_APP_API_URL;
  const TOKEN = localStorage.getItem("TOKEN");
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setIsFetchPostLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/getPosts",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      setPostDetails(data);
      setIsFetchPostLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  }

  function storyComponent() {
    return toggleStory ? (
      <>
        <div className="story">
          <Card className="addStoryComponent">
            <div className="addStoryComponentImage">
              <img src={contact} alt="" />
            </div>
            <div className="createStory">
              <p style={{ fontSize: "13px" }}>create story</p>
              <div className="addButton">
                <AddIcon sx={{ color: "white" }} />
              </div>
            </div>
          </Card>
          <div className="addStoryComponentnfo">
            <div>
              <div className="reeel" />
              <p>Share everyday moments with friends and family.</p>
            </div>
            <div>
              <div className="colck" />
              <p>Stories disappear after 24 hours.</p>
            </div>
            <div>
              <div className="message" />
              <p>Replies and reactions are private.</p>
            </div>
          </div>
        </div>
      </>
    ) : null;
  }

  return (
    <div className="homePageMiddle">
      <div className="homePageBoby">
        <div className="StoryComponent">
          <Card sx={{ borderRadius: "10px", height: "290.8px" }}>
            <CardContent>
              <div className="StoryComponentNav">
                <div onClick={() => setToggleStory(true)}>
                  <p>Story</p>
                </div>
                <div>
                  <p>Reels</p>
                </div>
                <div>
                  <p>Room</p>
                </div>
              </div>
              <Divider />
              <div>{storyComponent()}</div>
            </CardContent>
          </Card>
          <Create />
          {isFetchPostLoading ? (
            "loading...."
          ) : (
            <PostMaker postDetail={postDetail} />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePageMiddle;
