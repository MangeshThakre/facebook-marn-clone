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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { setPage } from "../../redux/userSplice.js";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import { toggleDropdown } from "../../redux/aboutPAgeSplice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  send_freindRequest,
  confirm_freindRequest,
} from "../../redux/freindSplice.js";
import {
  ConfirmDeletPopup,
  AboutPopUp,
} from "./about/AboutPopUpcomponent/AboutPopUp.js";
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
  bio,
  profileCover,
  relationship,
  created_at,
} from "../../redux/userSplice.js";
import "./user.css";
import { CardContent } from "@mui/material";

function User({ type }) {
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

  const [getFriendRequest, setGetFriendrequests] = useState({});
  const [friendsData, setFriendsData] = useState(false);

  const [PhotoType, setPhotoType] = useState("");
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const USERDETAIL = useSelector((state) => state.user.userDetail);
  const [cancleLoading, setCancleLoading] = useState(false);
  const [isAddFriendLoading, setIsAddfriendLoading] = useState(false);
  const [isConfirmedLoading, setIsConfirmedLoading] = useState(false);
  const [IsUserDetailLoading, setIsUserDetailLoading] = useState(false);
  const [showButton, setShowButton] = useState("");
  const page = useSelector((state) => state.user.setPage);
  const PROFILEPIC = useSelector((state) => state.user.profilePicture);
  const PROFILECOVER = useSelector((state) => state.user.profileCover);
  const SENT_FREINDREQUEST = useSelector(
    (state) => state.friend.send_freindRequest
  );
  const CONFIRM_FREINDREQUEST = useSelector(
    (state) => state.friend.confirm_freindRequest
  );
  const REJECT_FRIENDREQUEST = useSelector(
    (state) => state.friend.Reject_freindRequest
  );
  const toggleCreatePost = useSelector(
    (state) => state.globle.toggleCreatePost
  );

  const backgroundColor = useSelector(
    (state) => state.darkLight.backgroundColor
  );

  const backgroundColor_sub = useSelector(
    (state) => state.darkLight.backgroundColor_sub
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
  const TOGGLEDROPDOWN = useSelector((state) => state.about.toggleDropdown);

  useEffect(() => {
    USERID == USER.id ? setown(true) : setown(false);
  }, [USERID]);

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
    fetchFriendRequests();
    fetchFrinds();
  }, [USERID]);

  useEffect(() => {
    fetchFriendRequests();
  }, [SENT_FREINDREQUEST, REJECT_FRIENDREQUEST]);

  useEffect(() => {
    fetchFrinds();
  }, [CONFIRM_FREINDREQUEST]);

  async function getAboutInfo() {
    setIsUserDetailLoading(true);
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
      };
      dispatch(userDetail(userDetaile));
      dispatch(created_at(data.created_at));
      dispatch(currentCity(data.currentCity));
      dispatch(bio(data.bio ? data.bio : ""));
      dispatch(homeTown(data.homeTown));
      dispatch(workPlace(data.workPlace));
      dispatch(college(data.college));
      dispatch(school(data.school));
      dispatch(familyMember(data.familyMember));
      dispatch(
        relationship(
          data.relationship
            ? data.relationship
            : { relation: "", showIntro: false }
        )
      );
      dispatch(
        profilePicture(data.profilePic ? URL + "/" + data.profilePic : "")
      );
      dispatch(profileCover(data.profileBg ? URL + "/" + data.profileBg : ""));
      setIsUserDetailLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchFrinds() {
    try {
      const response = await axios({
        method: "get",
        url:
          URL +
          "/api/get_friends?user_id=" +
          USER.id +
          "&friend_id=" +
          USERID +
          "&page=0&limit=0",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      data ? setShowButton("none") : setShowButton("addFriend");
      setFriendsData(data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function fetchFriendRequests() {
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_friend_requests?request_id=" + USERID,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      if (data.sededRequest) setShowButton("FreindRequestCancle");
      if (!data.sededRequest) setShowButton("addFriend");
      if (data.getRequest) setShowButton("FreindRequestAccept");
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  async function requestSend() {
    setIsAddfriendLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/friend_request?requested_id=" + USERID,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      if (data == "sended") {
        setTimeout(() => {
          setIsAddfriendLoading(false);
          setShowButton("FreindRequestCancle");
          dispatch(send_freindRequest(!SENT_FREINDREQUEST));
        }, 500);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function cancleFriendRequest() {
    setCancleLoading(true);
    try {
      const response = await axios({
        merhod: "delete",
        url: URL + "/api/cancle_friend_request?requested_id=" + USERID,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      setTimeout(() => {
        setCancleLoading(false);
        setShowButton("addFriend");
        dispatch(send_freindRequest(!SENT_FREINDREQUEST));
      }, 500);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  async function handleConfirm() {
    setIsConfirmedLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/confirm_friend_request?conform_id=" + USERID,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;

      if (data == "confirmed")
        setTimeout(() => {
          setIsConfirmedLoading(false);
          setShowButton("none");
          dispatch(confirm_freindRequest(USERID));
        }, 500);
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function addPhoto(e, type) {
    if (own) {
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

  function functionButtons() {
    const FreindRequestAccept = (
      <Button
        onClick={() => handleConfirm()}
        sx={{
          width: "150px",
          height: "36px",
          margin: "0  7px",
          textTransform: "none",
          lineHeight: "0.9rem",
        }}
        variant="contained"
      >
        {isConfirmedLoading ? (
          <CircularProgress sx={{ color: "white" }} size="1.6rem" />
        ) : (
          <p> Accept request</p>
        )}
      </Button>
    );

    const FreindRequestCancle = (
      <div className="cancleFreindRequestBurron">
        <Button
          onClick={() => cancleFriendRequest()}
          sx={{
            color: "black",
          }}
          variant="contained"
        >
          {cancleLoading ? (
            <CircularProgress sx={{ color: "#2d87ea" }} size="1.6rem" />
          ) : (
            "Cancle Request"
          )}
        </Button>
      </div>
    );

    const addFriend = (
      <Button
        onClick={() => requestSend()}
        sx={{
          width: "150px",
          height: "36px",
          margin: "0  7px",
          textTransform: "none",
          lineHeight: "0.9rem",
        }}
        variant="contained"
      >
        {isAddFriendLoading ? (
          <CircularProgress sx={{ color: "white" }} size="1.6rem" />
        ) : (
          <>
            <AddCircleIcon
              sx={{
                fontSize: 20,
                marginRight: "5px",
              }}
            />
            <p> Add Friend</p>
          </>
        )}
      </Button>
    );

    if (own) {
      return (
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
      );
    } else {
      if (!friendsData) {
        if (showButton == "FreindRequestCancle") return FreindRequestCancle;
        if (showButton == "FreindRequestAccept") return FreindRequestAccept;
        if (showButton == "addFriend") return addFriend;
        if (CONFIRM_FREINDREQUEST == USERID) return null;
      } else return null;
    }
  }

  return (
    <div className="userPage" style={{ backgroundColor: backgroundColor }}>
      {toggleCreatePost ? <NewPosts /> : null}
      {toggleAboutPopUp ? <AboutPopUp /> : null}
      {togglseConformDeletePopup ? <ConfirmDeletPopup /> : null}
      {togglePostDelete ? <PostDeleteComponent /> : null}
      {(toggleUploadPhotoPopUp || uploadCover || TOGGLEDROPDOWN) &&
      USERID == USER.id ? (
        <div
          className="popupBg"
          onClick={() => {
            setToggleUploadPhotoPopUp(false);
            setUploadCover(false);
            dispatch(toggleDropdown(false));
          }}
        ></div>
      ) : null}
      {type == "own" ? <Navbar /> : null}
      <div style={{ backgroundColor: backgroundColor_sub }}>
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
            {IsUserDetailLoading ? (
              ""
            ) : PROFILECOVER ? (
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
                {IsUserDetailLoading ? (
                  <img className="profilePic" src={contact} alt="image" />
                ) : (
                  <img
                    className="profilePic"
                    src={PROFILEPIC ? PROFILEPIC : contact}
                    alt=""
                  />
                )}

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
              {IsUserDetailLoading ? (
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height={30}
                  sx={{ bgcolor: "grey.200" }}
                />
              ) : (
                USERDETAIL?.firstName + " " + USERDETAIL?.lastName
              )}
            </h1>
            <div
              className="button"
              style={{
                display: "flex",
                float: "right",
              }}
            >
              {functionButtons()}
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
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <div className="userBodydetail" style={{ marginTop: "20px" }}>
        {page === "POST" ? <Posts setPage={setPage} /> : null}
        {page === "ABOUT" ? <About /> : null}
        {page === "FRIENDS" ? <Friends /> : null}
        {page === "PHOTOS" ? <Photos /> : null}
      </div>
    </div>
  );
}

export default User;
