import React from "react";
import "../homePageMiddle/homePageMiddle.css";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { useState, useEffect, useRef } from "react";
import contact from "../../../image/contact.png";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Create from "../../User.js/posts/PostCompo/create.js";
import PostMaker from "../../User.js/posts/PostCompo/PostMaker";
import { useSelector } from "react-redux";
import AllPostSkeleton from "../../AllPostComponent/AllPostSkeleton";
import axios from "axios";
function HomePageMiddle() {
  const homePageMiddleRef = useRef(null);
  const [postDetail, setPostDetails] = useState([]);
  const [isFetchPostLoading, setIsFetchPostLoading] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [page, setPage] = useState(1);
  const URL = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const TOKEN = localStorage.getItem("TOKEN");
  const prifilePic = USER.profilePic ? URL + "/" + USER.profilePic : contact;

  /// dark mode
  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  const BACKGROUNDCOLOR = useSelector(
    (state) => state.darkLight.backgroundColor
  );
  const ICONCOLOR = useSelector((state) => state.darkLight.iconColor);
  ////
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setIsFetchPostLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + `/api/getFriendsPost/?page=${page}&limit=5`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;

      if (response.data.next) {
        setNextPage(true);
      } else setNextPage(false);
      const postData = [...postDetail, ...data.data];
      setPostDetails(postData);
      setIsFetchPostLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    homePageMiddleRef.current.addEventListener("scroll", () => {
      if (
        homePageMiddleRef.current.clientHeight +
          homePageMiddleRef.current.scrollTop >=
        homePageMiddleRef.current.scrollHeight
      ) {
        setPage(page + 1);
      }
    });
  });

  useEffect(() => {
    if (nextPage) {
      fetchPosts();
    }
  }, [page]);

  function storyComponent() {
    return (
      <>
        <div className="story">
          <Card
            className="addStoryComponent"
            sx={{ backgroundColor: BACKGROUNDCOLOR }}
          >
            <div className="addStoryComponentImage">
              <img src={prifilePic} alt="" />
            </div>
            <div className="createStory">
              <p style={{ fontSize: "13px", color: ICONCOLOR }}>create story</p>
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
    );
  }

  return (
    <div className="homePageMiddle" ref={homePageMiddleRef}>
      <div className="homePageBoby">
        <div className="StoryComponent">
          <Card
            sx={{
              borderRadius: "10px",
              height: "290.8px",
              backgroundColor: SUB_BACKGROUND_COLOR,
              color: ICONCOLOR,
            }}
          >
            <CardContent>
              <div className="StoryComponentNav">
                <h2>Story</h2>
              </div>
              <Divider />
              <div>{storyComponent()}</div>
            </CardContent>
          </Card>
        </div>
        <Create />
        {
          <>
            <PostMaker postDetail={postDetail} />
            {isFetchPostLoading ? (
              <div>
                <AllPostSkeleton />
                {/* <AllPostSkeleton /> */}
              </div>
            ) : null}
            <div className="loadMore">
              {nextPage ? (
                <>
                  <AllPostSkeleton />
                  {/* <AllPostSkeleton /> */}
                </>
              ) : null}
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default HomePageMiddle;
