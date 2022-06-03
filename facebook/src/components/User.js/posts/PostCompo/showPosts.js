import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./showPost.css";
import { useState } from "react";
import hart from "../../../../image/hart.png";
import { dividerClasses } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import PostMaker from "./PostMaker.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import { posts, UpdatedPost } from "../../../../redux/globleSplice.js";
function ShowPosts() {
  const dispatch = useDispatch();
  const { USERID } = useParams();
  const [postDetail, setPostDetails] = useState([]);
  const [isFetchPostLoading, setIsFetchPostLoading] = useState(false);
  const URL = process.env.REACT_APP_API_URL;
  const TOKEN = localStorage.getItem("TOKEN");
  const POSTS = useSelector((state) => state.globle.posts);
  const UPDATEDPOST = useSelector((state) => state.globle.UpdatedPost);
  const ACTUALDELETEPOSTID = useSelector(
    (state) => state.globle.ActualdeletePostId
  );

  useEffect(() => {
    fetchPosts();
  }, [USERID]);

  useEffect(() => {
    setPostDetails([...POSTS, ...postDetail]);
  }, [POSTS]);

  useEffect(() => {
    var arr = [];
    if (Object.keys(UPDATEDPOST).length != 0) {
      postDetail.forEach((e, i) => {
        if (e._id == UPDATEDPOST._id) {
          arr.push(UPDATEDPOST);
        } else {
          arr.push(e);
        }
      });
    }
    setPostDetails(arr);
  }, [UPDATEDPOST]);

  useEffect(() => {
    var arr = [];
    postDetail.forEach((e, i) => {
      if (e._id.toString() !== ACTUALDELETEPOSTID) arr.push(e);
    });
    setPostDetails(arr);
  }, [ACTUALDELETEPOSTID]);

  async function fetchPosts() {
    setIsFetchPostLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/getPosts?user_id=" + USERID,
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
