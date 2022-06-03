import Navbar from "../navbar/navbar";
import Posts from "./posts/Post.js";
import About from "./about/About";
import Photos from "./photos/Photos";
import Friends from "./friends/Friends";
import Card from "@mui/material/Card";
import NewPosts from "./newPosts/newPosts";
import contact from "../../image/contact.png";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { setPage } from "../../redux/userSplice.js";
import {
  ConfirmDeletPopup,
  AboutPopUp,
} from "./about/AboutPopUpcomponent/AboutPopUp.js";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import PostDeleteComponent from "./posts/PostCompo/postDeleteComponent.js";
import {
  userDetail,
  currentCity,
  workPlace,
  homeTown,
  college,
  school,
  familyMember,
  profilePicture,
  profileCover,
} from "../../redux/userSplice.js";
import "./user.css";
import { CardContent } from "@mui/material";

function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userNavRef = useRef(null);
  const PhotoBgRef = useRef(null);
  const PhotoRef = useRef(null);
  const { USERID } = useParams();
  const [own, setown] = useState(false);
  const [uploadCover, setUploadCover] = useState(false);
  const [toggleUploadPhotoPopUp, setToggleUploadPhotoPopUp] = useState(false);
  const [uploadPhotoLoading, setUploadPhotoLoading] = useState(false);
  const [PhotoType, setPhotoType] = useState("");
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const USERDETAIL = useSelector((state) => state.user.userDetail);
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const page = useSelector((state) => state.user.setPage);
  const PROFILEPIC = useSelector((state) => state.user.profilePicture);
  const PROFILECOVER = useSelector((state) => state.user.profileCover);
  const toggleCreatePost = useSelector(
    (state) => state.globle.toggleCreatePost
  );

  const backgroundColor = useSelector(
    (state) => state.darkLight.backgroundColor
  );

  const toggleAboutPopUp = useSelector(
    (state) => state.globle.toggleAboutPopUp
  );
  const togglseConformDeletePopup = useSelector(
    (state) => state.about.togglseConformDeletePopup
  );
  const togglePostDelete = useSelector(
    (state) => state.globle.togglePostDelete
  );

  useEffect(() => {
    USERID == USER.id ? setown(true) : setown(false);
  });

  useEffect(() => {
    const options = userNavRef.current.childNodes;

    for (const li of options) {
      const [className, isActive] = li.className.split(" ");
      li.className = "";
      if (className == page) {
        li.className = className + " activePage";
      } else {
        li.className = className + " inactivePage";
      }
    }
  }, [page]);

  useEffect(() => {
    getAboutInfo();
  }, [USERID]);

  // useEffect(() => {
  //   getAboutInfo();
  // }, []);

  async function getAboutInfo() {
    console.log("in function");
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_about_info?user=" + USERID,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      const userDetaile = {
        DOB: data.DOB,
        phoneNo: data.phoneNo,
        lastName: data.lastName,
        firstName: data.firstName,
        email: data.email,
        _id: data._id,
        created_at: data.created_at,
      };
      dispatch(userDetail(userDetaile));
      dispatch(currentCity(data.currentCity));
      dispatch(homeTown(data.homeTown));
      dispatch(workPlace(data.workPlace));
      dispatch(college(data.college));
      dispatch(school(data.school));
      dispatch(familyMember(data.familyMember));
      if (data.profilePic) {
        dispatch(profilePicture(URL + "/" + data.profilePic));
      } else dispatch(profilePicture(""));
      if (data.profileBg) {
        dispatch(profileCover(URL + "/" + data.profileBg));
      } else dispatch(profileCover(""));
    } catch (error) {
      console.log(error);
    }
  }
  async function addPhoto(e, type) {
    console.log(type);

    if (USERID == USER.id) {
      const reader = new FileReader();
      var formData = new FormData();
      formData.append("profileImg", e.target.files[0]);
      var oldPic;
      if (type == "profilePic") {
        oldPic = PROFILEPIC;
        setUploadPhotoLoading(true);
      } else if (type == "profileBg") {
        oldPic = PROFILECOVER;
      }
      try {
        const response = await axios({
          method: "post",
          url:
            URL + "/api/upload_photo?type=" + type + "&OldProfileImg=" + oldPic,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          data: formData,
        });

        const data = await response.data;
        if (type == "profilePic") {
          dispatch(profilePicture(URL + "/" + data));
          setUploadPhotoLoading(false);
        } else if (type == "profileBg") {
          dispatch(profileCover(URL + "/" + data));
          setUploadCover(false);
        }
      } catch (error) {
        console.log(error);
      }
      setToggleUploadPhotoPopUp(false);
      // setUploadCover(false)
    }
  }

  async function DeletePhoto(type) {
    var oldPic;
    if (type == "profilePic") {
      oldPic = PROFILEPIC;
    } else if (type == "profileBg") {
      oldPic = PROFILECOVER;
    }

    const response = await axios({
      method: "get",
      url: URL + "/api/Delete_photo?type=" + type + "&OldProfileImg=" + oldPic,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const data = await response.data;
    if (data == "deleted" && type === "profilePic") {
      dispatch(profilePicture(""));
      setToggleUploadPhotoPopUp(false);
    } else if (data == "deleted" && type == "profileBg") {
      dispatch(profileCover(""));
      setUploadCover(false);
    }
  }

  function uplaodPhoto(type) {
    if (type === "prifilePic") {
      PhotoRef.current.click();
    } else if (type == "profileBg") {
    }
    return (
      <div className="uploadContainer">
        <Card>
          <div className="uplaodPhotoPopup">
            <div
              onClick={() => {
                PhotoRef.current.click();
              }}
            >
              {uploadPhotoLoading ? (
                <CircularProgress sx={{ color: "white" }} size="1.6rem" />
              ) : (
                <>
                  <FileUploadOutlinedIcon />
                  <p>Upload Photo</p>
                </>
              )}
            </div>
            <div onClick={() => DeletePhoto(type)}>
              <DeleteOutlineOutlinedIcon />
              <p>Remove Photo</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  function uplaodPhotoCover(type) {
    if (type === "prifilePic") {
      PhotoRef.current.click();
    } else if (type == "profileBg") {
    }
    return (
      <div className="uploadBgContainer">
        <Card>
          <div className="uplaodPhotoPopup">
            <div
              onClick={() => {
                PhotoBgRef.current.click();
              }}
            >
              {uploadPhotoLoading ? (
                <CircularProgress sx={{ color: "white" }} size="1.6rem" />
              ) : (
                <>
                  <FileUploadOutlinedIcon />
                  <p>Upload Photo</p>
                </>
              )}
            </div>
            <div onClick={() => DeletePhoto(type)}>
              <DeleteOutlineOutlinedIcon />
              <p>Remove Photo</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {toggleCreatePost ? <NewPosts /> : null}
      {toggleAboutPopUp ? <AboutPopUp /> : null}
      {togglseConformDeletePopup ? <ConfirmDeletPopup /> : null}
      {togglePostDelete ? <PostDeleteComponent /> : null}
      {(toggleUploadPhotoPopUp || uploadCover) && USERID == USER.id ? (
        <div
          className="popupBg"
          onClick={() => {
            setToggleUploadPhotoPopUp(false);
            setUploadCover(false);
          }}
        ></div>
      ) : null}

      <Navbar />
      <div>
        <div style={{ display: "none" }}>
          <input
            ref={PhotoRef}
            onChange={(e) => {
              addPhoto(e, "profilePic");
            }}
            type="file"
          />
          <input
            ref={PhotoBgRef}
            onChange={(e) => {
              addPhoto(e, "profileBg");
            }}
            type="file"
          />
        </div>

        <div className="profileBackground">
          <fieldset className="profile" style={{ position: "relative" }}>
            {PROFILECOVER ? (
              <img className="profileBg" src={PROFILECOVER} alt="" />
            ) : (
              ""
            )}

            <legend
              style={{ position: "absolute", bottom: "-80px", left: "30px" }}
            >
              <div
                onClick={() => {
                  setToggleUploadPhotoPopUp(true);
                }}
                style={
                  own
                    ? {
                        border: "none",
                        position: " relative",
                        cursor: "pointer",
                      }
                    : { border: "none", position: " relative" }
                }
              >
                <img
                  className="profilePic"
                  src={PROFILEPIC ? PROFILEPIC : contact}
                  alt=""
                />
                {own ? (
                  <div
                    className="CameraAltIcon"
                    style={{ backgroundColor: "#45464c" }}
                  >
                    <CameraAltIcon sx={{ color: "white" }} />
                  </div>
                ) : null}
              </div>
              {toggleUploadPhotoPopUp && USERID === USER.id
                ? uplaodPhoto("profilePic")
                : null}
            </legend>
          </fieldset>
        </div>

        <div className="username">
          <div>
            <h1 style={{ marginLeft: "200px" }}>
              {USERDETAIL?.firstName + " " + USERDETAIL?.lastName}
            </h1>
            <div
              className="button"
              style={{
                display: "flex",
                float: "right",
              }}
            >
              {own ? (
                <div style={{ position: "relative" }}>
                  <Button
                    sx={{
                      width: "115px",
                      height: "36px",
                      margin: "0  7px",
                      textTransform: "none",
                      lineHeight: "0.9rem",
                    }}
                    variant="contained"
                  >
                    <AddCircleIcon sx={{ fontSize: 20, marginRight: "5px" }} />
                    <p> Story</p>
                  </Button>
                  <Button
                    className="button"
                    sx={{
                      width: "115px",
                      height: "36px",
                      margin: "0  7px",
                      textTransform: "none",
                      lineHeight: "0.9rem",
                    }}
                    variant="contained"
                    onClick={() => {
                      setUploadCover(true);
                    }}
                  >
                    <EditIcon sx={{ fontSize: 20, marginRight: "2px" }} />
                    <p style={{ display: "block ruby" }}>Cover photo</p>
                  </Button>

                  {uploadCover && USERID === USER.id
                    ? uplaodPhotoCover("profileBg")
                    : null}
                </div>
              ) : (
                <Button
                  sx={{
                    width: "150px",
                    height: "36px",
                    margin: "0  7px",
                    textTransform: "none",
                    lineHeight: "0.9rem",
                  }}
                  variant="contained"
                >
                  <AddCircleIcon
                    sx={{
                      fontSize: 20,
                      marginRight: "5px",
                    }}
                  />
                  <p> Add Friend</p>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="userBodyNav">
          <div ref={userNavRef}>
            <li
              className="POST activePage"
              onClick={() => dispatch(setPage("POST"))}
            >
              <div>
                <p>Posts</p>
              </div>
            </li>
            <li
              className="ABOUT inactivePage"
              onClick={() => dispatch(setPage("ABOUT"))}
            >
              <div>
                <p>About</p>
              </div>
            </li>
            <li
              className="FRIENDS inactivePage"
              onClick={() => dispatch(setPage("FRIENDS"))}
            >
              <div>
                <p>Friends</p>
              </div>
            </li>
            <li
              className="PHOTOS  inactivePage"
              onClick={() => dispatch(setPage("PHOTOS"))}
            >
              <div>
                <p> Photos</p>
              </div>
            </li>
          </div>
        </div>
      </div>

      <div
        className="userBodydetail"
        style={{ marginTop: "20px", backgroundColor: backgroundColor }}
      >
        {page === "POST" ? <Posts setPage={setPage} /> : null}
        {page === "ABOUT" ? <About /> : null}
        {page === "FRIENDS" ? <Friends /> : null}
        {page === "PHOTOS" ? <Photos /> : null}
      </div>
    </div>
  );
}

export default User;
