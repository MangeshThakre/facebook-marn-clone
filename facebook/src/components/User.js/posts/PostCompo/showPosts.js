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
function ShowPosts() {
  const [postDetail, setPostDetails] = useState([]);
  const POSTS = useSelector((state) => state.globle.posts);
  // const detail = [
  //   {
  //     text: "hello",
  //     Bg: null,
  //     photo: null,
  //   },
  //   {
  //     text: "hello",
  //     Bg: hart,
  //     photo: null,
  //   },
  //   {
  //     text: "hello",
  //     Bg: null,
  //     photo: hart,
  //   },
  // ];
  useEffect(() => {
    setPostDetails(POSTS);
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
      {POSTS.length != 0 ? (
        POSTS.map((e) => {
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
