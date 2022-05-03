import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import "./showPost.css";
import { useState } from "react";
import AllPost from "../../../AllPostComponent/AllPost";

import { dividerClasses } from "@mui/material";
function ShowPosts() {
  const [postDetail, setPostDetails] = useState([]);

  const detail = [
    {
      text: "hello",
      Bg: null,
      photo: null,
    },
    {
      text: "hello",
      Bg: null,
      photo: null,
    },
  ];
  useEffect(() => {
    setPostDetails(detail);
  }, []);

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
      {postDetail.length != 0 ? (
        postDetail.map((e) => {
          return (
            <div>
              <AllPost text={e.text} photo={e.photo} bg={e.Bg} />
            </div>
          );
        })
      ) : (
        <div className="noPost" style={{ color: "gray" }}>
          <h3>No posts available</h3>
        </div>
      )}
    </div>
  );
}

export default ShowPosts;
