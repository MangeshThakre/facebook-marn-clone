import "./newPost.css";
import {
  toggleCreatePost,
  togglePhotoVideo,
  posts,
} from "../../../redux/globleSplice";
import { useDispatch, useSelector } from "react-redux";
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
import { useEffect, useState, useRef } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AddPhoto from "../posts/PostCompo/AddPhoto.js";
import axios from "axios";

function NewPosts() {
  const dispatch = useDispatch();
  const USER = useSelector((state) => state.globle.user);
  const POSTS = useSelector((state) => state.globle.posts);
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const [toggleIconicon, setToggleIcon] = useState(false);
  const [toggleBg, setToggleBg] = useState(false);
  const [PhotoFile, setPhotoFile] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [input_text, setInputText] = useState("");
  const [Bg, setBg] = useState("");
  const [bgName, setBgName] = useState("");
  const postBody = useRef(null);
  const bgListRef = useRef(null);
  const bgIcon = useRef(null);
  const addPhoteRef = useRef(null);
  const [color, setColor] = useState("#45bd62");
  const TOGGLEPHOTOVIDEO = useSelector(
    (state) => state.globle.togglePhotoVideo
  );
  const handelPost = async () => {
    const post = {
      text: input_text != "" ? input_text : null,
      bg: bgName != "" ? bgName : null,
      photo: base64Image != "" ? base64Image : null,
    };

    dispatch(posts([...POSTS, post]));

    var formData = new FormData();
    formData.append("text", input_text);
    formData.append("bg", bgName);
    formData.append("photo", PhotoFile);
    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/insert_post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: formData,
      });
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log("Error", error);
    }

    dispatch(toggleCreatePost(false));
    dispatch(togglePhotoVideo(false));
  };

  const onEmojiClick = (event, emojiObject) => {
    setInputText(input_text + emojiObject.emoji);
  };

  useEffect(() => {
    handelPhoto();
  }, [TOGGLEPHOTOVIDEO]);

  const handelPhoto = () => {
    if (TOGGLEPHOTOVIDEO) {
      toggleBg
        ? (bgListRef.current.style.display = "none")
        : (bgIcon.current.style.display = "none");
      postBody.current.style.display = "flex";
      postBody.current.style.flexDirection = "row";
      postBody.current.firstChild.style.height = "60px";
      addPhoteRef.current.style.display = "block";
    } else {
      toggleBg
        ? (bgListRef.current.style.display = "block")
        : (bgIcon.current.style.display = "block");
      postBody.current.style.display = "flex";
      postBody.current.style.flexDirection = "column";
      postBody.current.firstChild.style.height = "80px";
      addPhoteRef.current.style.display = "none";
      setPhotoFile(null);
    }
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
        <li
          className="li active"
          onClick={() => {
            handelBg("none");
            setBgName("");
          }}
        >
          <div className="img" style={{ backgroundColor: "#e4e6eb" }}></div>
        </li>
        <li
          className="li"
          onClick={() => {
            handelBg(purple);
            setBgName("purple");
          }}
        >
          <img className="img" src={purple} alt="" />
        </li>
        <li
          className="li"
          onClick={() => {
            handelBg(orange);
            setBgName("orange");
          }}
        >
          <img className="img" src={orange} alt="" />
        </li>
        <li
          className="li"
          onClick={() => {
            handelBg(radient);
            setBgName("radient");
          }}
        >
          <img className="img" src={radient} alt="" />
        </li>
        <li
          className="li"
          onClick={() => {
            handelBg(iceCream);
            setBgName("iceCream");
          }}
        >
          <img className="img" src={iceCream} alt="" />
        </li>
        <li
          className="li"
          onClick={() => {
            handelBg(nightSky);
            setBgName("nightSky");
          }}
        >
          <img className="img" src={nightSky} alt="" />
        </li>

        <li
          className="li"
          onClick={() => {
            handelBg(plain);
            setBgName("plain");
          }}
        >
          <img className="img" src={plain} alt="" />
        </li>

        <li
          className="li"
          onClick={() => {
            handelBg(heart);
            setBgName("heart");
          }}
        >
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
            <IconButton
              onClick={() => {
                dispatch(toggleCreatePost(false));
                dispatch(togglePhotoVideo(false));
              }}
            >
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
              <h5>{USER?.firstName + " " + USER?.lastName}</h5>
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
              <AddPhoto
                setPhotoFile={setPhotoFile}
                PhotoFile={PhotoFile}
                setBase64Image={setBase64Image}
                base64Image={base64Image}
              />
            </div>
            <div className="createPosts_body_options">
              <p style={{ cursor: "pointer" }}>Add to yor post</p>
              <div>
                <IconButton
                  disabled={Bg !== "none" && Bg !== "" ? true : false}
                  onClick={() => {
                    dispatch(togglePhotoVideo(true));
                    handelPhoto();
                  }}
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
                disabled={input_text === "" && PhotoFile == null}
                sx={{ width: "100%" }}
                onClick={() => {
                  handelPost();
                }}
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
