import React from "react";
import "./newPost.css";
import { toggleCreatePost } from "../../../redux/globleSplice";
import { useDispatch } from "react-redux";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "@mui/material/Divider";
import contact from "../../../image/contact.png";
import Button from "@mui/material/Button";
import bg from "../../../image/bg.png";
import nightSky from "../../../image/nightSky.png";
import iceCream from "../../../image/iceCream.png";
import orange from "../../../image/orange.png";
import purple from "../../../image/purple.png";
import radient from "../../../image/radiend.png";
import plain from "../../../image/plain.png";
import heart from "../../../image/hart.png";
import IconButton from "@mui/material/IconButton";
import Picker from "emoji-picker-react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState, useRef } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AddPhoto from "../posts/PostCompo/AddPhoto.js";
function NewPosts() {
  const dispatch = useDispatch();
  const [toggleIconicon, setToggleIcon] = useState(false);
  const [toggleBg, setToggleBg] = useState(false);
  const [Bg, setBg] = useState("none");
  const postBody = useRef(null);
  const bgListRef = useRef(null);
  const bgIcon = useRef(null);
  const addPhoteRef = useRef(null);
  const [input_text, setInputText] = useState("");
  const [color, setColor] = useState("#45bd62");
  const onEmojiClick = (event, emojiObject) => {
    // setEmoji(emojiObject.emoji);
    setInputText(input_text + emojiObject.emoji);
  };

  const handelPhoto = () => {
    bgIcon.current?.remove();
    bgListRef.current?.remove();
    postBody.current.style.display = "flex";
    postBody.current.firstChild.style.height = "60px";
    addPhoteRef.current.style.display = "block";
  };

  const bgList = (
    <div className="bgList" ref={bgListRef}>
      <ul id="list">
        <li
          className="back"
          style={{ backgroundColor: "#e4e6eb" }}
          onClick={() => setToggleBg(false)}
        >
          <ArrowBackIosIcon sx={{ fontSize: 20 }} />
        </li>
        <li className="li active" onClick={() => handelBg("none")}>
          <div className="img" style={{ backgroundColor: "#e4e6eb" }}></div>
        </li>
        <li className="li" onClick={() => handelBg(purple)}>
          <img className="img" src={purple} alt="" />
        </li>
        <li className="li" onClick={() => handelBg(orange)}>
          <img className="img" src={orange} alt="" />
        </li>
        <li className="li" onClick={() => handelBg(radient)}>
          <img className="img" src={radient} alt="" />
        </li>
        <li className="li" onClick={() => handelBg(iceCream)}>
          <img className="img" src={iceCream} alt="" />
        </li>
        <li className="li" onClick={() => handelBg(nightSky)}>
          <img className="img" src={nightSky} alt="" />
        </li>

        <li className="li" onClick={() => handelBg(plain)}>
          <img className="img" src={plain} alt="" />
        </li>

        <li className="li" onClick={() => handelBg(heart)}>
          <img className="img" src={heart} alt="" />
        </li>
      </ul>
    </div>
  );

  const handelBg = (bg) => {
    var btnContainer = document.getElementById("list");
    var btns = btnContainer.getElementsByClassName("li");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
    if (bg == "none") {
      postBody.current.style.backgroundImage = `none`;
      postBody.current.style.height = ``;
      postBody.current.className = "";
      setColor("#45bd62");
    } else {
      postBody.current.style.backgroundImage = `url(${bg})`;
      postBody.current.className += " activeBg";
      console.log(postBody.current.child);
      setColor("gray");
    }
    setBg(bg);
  };

  return (
    <div className="createPosts">
      <div className="createPostBox" style={{ backgroundColor: "white" }}>
        <div className="createPosts_head">
          <div></div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Create Post</h3>
          </div>
          <div className="createPost_close">
            <IconButton onClick={() => dispatch(toggleCreatePost(false))}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <Divider />
        <div className="createPosts_body">
          <div className="createPosts_body_header">
            <div className="createPosts_body_header_pic">
              <img src={contact} alt="pic" />
            </div>
            <div>
              <h5>Mangesh Thakre</h5>
              <h4>public</h4>
            </div>
          </div>
          <div className="createPosts_body_body">
            <div className="postBody" ref={postBody}>
              <textarea
                type="text"
                rows="4"
                value={input_text}
                onChange={(e) => {
                  // setPostText(e.target.value);
                  setInputText(e.target.value);
                }}
                placeholder="What's in your mind?"
              />
              <div
                className="createPosts_body_bg"
                style={{ postiton: "relative" }}
              >
                {toggleBg ? (
                  bgList
                ) : (
                  <img
                    src={bg}
                    alt="bg"
                    ref={bgIcon}
                    onClick={() => setToggleBg(true)}
                  />
                )}
                <div
                  style={{ position: "absolute", top: "127px", left: "64rem" }}
                >
                  {toggleIconicon ? (
                    <Picker
                      class="light"
                      style={{ height: "211px", width: "240px" }}
                      onEmojiClick={onEmojiClick}
                    ></Picker>
                  ) : null}
                </div>
                <IconButton>
                  <SentimentSatisfiedAltIcon
                    onClick={() => setToggleIcon(!toggleIconicon)}
                  />
                </IconButton>
              </div>
            </div>
            <div ref={addPhoteRef} style={{ display: "none" }}>
              <AddPhoto />
            </div>
            <div className="createPosts_body_options">
              <p style={{ cursor: "pointer" }}>Add to yor post</p>
              <div>
                <IconButton
                  disabled={Bg !== "none" && Bg !== "" ? true : false}
                  onClick={() => handelPhoto()}
                >
                  <PhotoLibraryIcon sx={{ color: color }} />
                </IconButton>
                <IconButton>
                  <LocationOnIcon sx={{ color: "#f5533d" }} />
                </IconButton>
              </div>
            </div>
            <div className="createPosts_body_bottom">
              <Button
                variant="contained"
                disabled={input_text === ""}
                sx={{ width: "100%" }}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPosts;
