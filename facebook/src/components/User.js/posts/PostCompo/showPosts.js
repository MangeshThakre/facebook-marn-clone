import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import "./showPost.css";
import { useState } from "react";
import AllPost from "../../../AllPostComponent/AllPost";
import hart from "../../../../image/hart.png";
import { dividerClasses } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
function ShowPosts() {
  const [postDetail, setPostDetails] = useState([]);
  const [isFetchPostLoading, setIsFetchPostLoading] = useState(false);
  const URL = process.env.REACT_APP_API_URL;
  const POSTS = useSelector((state) => state.globle.posts);
  const TOKEN = localStorage.getItem("TOKEN");
  useEffect(() => {
    setPostDetails(POSTS);
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

  console.log(postDetail);

  const posts =
    postDetail.length != 0 ? (
      postDetail.map((e) => {
        return (
          <div>
            <AllPost text={e.text} photo={e.photo} bg={e.Bg} postData={e} />
          </div>
        );
      })
    ) : (
      <div className="noPost" style={{ color: "gray" }}>
        <h3>No posts available</h3>
      </div>
    );

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
      {isFetchPostLoading ? "loading...." : posts}
    </div>
  );
}

export default ShowPosts;
