import React from "react";
import "./AllPost.css";
import IconButton from "@mui/material/IconButton";
import contact from "../../image/contact.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import InputEmoji from "react-input-emoji";
import Divider from "@mui/material/Divider";
import date from "date-and-time";
import like from "../../image/like.svg";
import { useState, createRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import nightSky from "../../image/nightSky.png";
import iceCream from "../../image/iceCream.png";
import orange from "../../image/orange.png";
import purple from "../../image/purple.png";
import radient from "../../image/radiend.png";
import plain from "../../image/plain.png";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import heart from "../../image/hart.png";
import { useParams } from "react-router-dom";
import {
  toggleCreatePost,
  postUpdate,
  UpdatedPost,
  togglePostDelete,
  deletePostId,
} from "../../redux/globleSplice";

import axios from "axios";
function AllPost({ postData }) {
  const dispatch = useDispatch();
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const URL = process.env.REACT_APP_API_URL;
  const TOKEN = localStorage.getItem("TOKEN");
  const [commentText, setCommentText] = useState("");
  const [togglelike, setToggleLike] = useState(false);
  const [toggleDeleteEdit, setToggleDeleteEdit] = useState(false);
  const profilePic = postData.profilePic ? URL + "/" + postData.profilePic : "";

  const text = postData.text;
  const photo = postData.photo;
  const Name = postData.userName;
  const commentInput = createRef(null);
  var bg;
  if (postData.bg == "iceCream") bg = iceCream;
  if (postData.bg == "nightSky") bg = nightSky;
  if (postData.bg == "orange") bg = orange;
  if (postData.bg == "purple") bg = purple;
  if (postData.bg == "radient") bg = radient;
  if (postData.bg == "plain") bg = plain;
  if (postData.bg == "heart") bg = heart;
  if (postData.bg == "null") bg = null;

  const posted_at = date.format(new Date(postData.posted_at), "MMM DD YYYY");
  const send = () => {
    setCommentText("");
  };

  const { USERID } = useParams();

  useEffect(() => {
    const user_id = USER?.id;
    for (const user of postData.like_dislike) {
      user == user_id ? setToggleLike(true) : setToggleLike(false);
    }
  }, []);

  async function handlelike() {
    let likeDislike = new Set(postData.like_dislike);
    if (!togglelike) {
      likeDislike.add(USER?.id);
    } else {
      likeDislike.delete(USER.id);
    }
    const data = {
      likeDislike: [...likeDislike],
      postId: postData._id,
    };
    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/like_dislike",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: data,
      });
    } catch (error) {
      console.log("Error", error);
    }
  }

  function PostBodyFun() {
    if (bg == null && photo == null) {
      return (
        <div>
          <p>{text}</p>
        </div>
      );
    }
    if (bg != null) {
      return (
        <div
          className="AllPost_bodyBackground"
          style={{ backgroundImage: `url(  ${bg})`, color: "white" }}
        >
          <h2>{text}</h2>
        </div>
      );
    }
    if (photo != null) {
      return (
        <>
          <div>{text}</div>
          <div className="AllPost_body_photo">
            <img src={URL + "/" + photo} alt="" />
          </div>
        </>
      );
    }
  }

  function LikeCommentSCounts() {
    if (
      postData.like_dislike.length == 0 ||
      (togglelike && postData.like_dislike.length == 1)
    ) {
      return (
        <>
          {togglelike ? (
            <>
              <img src={like} alt="like" />
              <p> {USER?.firstName + " " + USER?.lastName}</p>
            </>
          ) : (
            ""
          )}
        </>
      );
      if (postData.like_dislike.length > 0) {
        {
          togglelike ? (
            <>
              <img src={like} alt="like" />
              <p> You and {postData.like_dislike.length - 1} other</p>
            </>
          ) : (
            <>
              <img src={like} alt="like" />
              <p> {postData.like_dislike.length - 1}</p>
            </>
          );
        }
      }
    }

    return (
      <>
        <img src={like} alt="like" />
        <p>
          {togglelike
            ? "You and " + postData.like_dislike.length + " others"
            : postData.like_dislike.length - 1}
        </p>
      </>
    );
  }

  function deleteEdit() {
    function deletee() {
      setToggleDeleteEdit(false);
      dispatch(togglePostDelete(true));
      dispatch(deletePostId(postData._id));
    }
    return (
      <div className="DeleteEditPopup">
        <Card>
          <CardContent>
            <div className="DeleteEditPopupBody">
              <div
                onClick={() => {
                  dispatch(postUpdate(postData));
                  dispatch(toggleCreatePost(true));
                  setToggleDeleteEdit(false);
                }}
              >
                <ModeEditOutlinedIcon />
                <p>edit Post</p>
              </div>
              <div
                onClick={() => {
                  deletee();
                }}
              >
                <DeleteOutlinedIcon />
                <p>Delete Post</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="AddPost">
      <Card sx={{ borderRadius: "10px" }}>
        <CardContent>
          <div className="AllPost_upper">
            <div>
              {toggleDeleteEdit ? deleteEdit() : null}

              <div className="createPosts_body_header_pic">
                {profilePic != "" ? (
                  <img src={profilePic} alt="pic" />
                ) : (
                  <img src={contact} alt="pic" />
                )}
              </div>
              <div>
                <h5>{Name}</h5>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p> {posted_at}</p>
                  <PublicOutlinedIcon sx={{ fontSize: "20px" }} />
                </div>
              </div>
            </div>
            <div>
              {USERID && USERID === USER.id ? (
                <>
                  <IconButton
                    onClick={() => setToggleDeleteEdit(!toggleDeleteEdit)}
                  >
                    <MoreHorizOutlinedIcon />
                  </IconButton>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="AllPost_body">{PostBodyFun()}</div>

          <div className="AllPost_lower">
            <div className="LikeCommentsCounts">{LikeCommentSCounts()}</div>
            <Divider variant="middle" />

            <div className="AllPost_lower_likeShareComment">
              <div>
                <IconButton
                  onClick={() => {
                    setToggleLike((pertogglelike) => !pertogglelike);
                    handlelike();
                  }}
                >
                  {togglelike ? (
                    <ThumbUpAltIcon sx={{ color: "#0570e7" }} />
                  ) : (
                    <ThumbUpAltOutlinedIcon />
                  )}
                </IconButton>
              </div>
              <div>
                <IconButton onClick={() => console.log(commentInput.current)}>
                  <ChatBubbleOutlineOutlinedIcon />
                </IconButton>
              </div>
            </div>

            <Divider variant="middle" />
            <div className="AllPost_lower_inputMessage">
              <InputEmoji
                className="commentInput"
                ref={commentInput}
                value={commentText}
                onChange={setCommentText}
                onEnter={commentText != "" ? send : null}
                placeholder="Type a message"
              />

              <p style={{ fontSize: "10px" }}> Press Enter to post.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AllPost;
