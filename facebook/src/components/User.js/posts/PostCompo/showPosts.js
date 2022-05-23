import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import "./showPost.css";
import { useState } from "react";
import hart from "../../../../image/hart.png";
import { dividerClasses } from "@mui/material";
import { useSelector } from "react-redux";
import PostMaker from "./PostMaker.js";
import axios from "axios";
function ShowPosts() {
  const [postDetail, setPostDetails] = useState([]);
  const [isFetchPostLoading, setIsFetchPostLoading] = useState(false);
  const URL = process.env.REACT_APP_API_URL;
  const TOKEN = localStorage.getItem("TOKEN");
  const POSTS = useSelector((state) => state.globle.posts);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setPostDetails(POSTS, ...postDetail);
  }, [POSTS]);
 

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
  return (
    <div className="showPosts">
      <Card sx={{ borderRadius: "10px" }}>
        <CardContent>
          <div className="showePosts_upper">
            <h2>Posts</h2>
          </div>
          <div className="showPots_lower"></div>
        </CardContent>
      </Card>
      {isFetchPostLoading ? (
        "loading...."
      ) : (
        <PostMaker postDetail={postDetail} />
      )}
    </div>
  );
}

export default ShowPosts;
