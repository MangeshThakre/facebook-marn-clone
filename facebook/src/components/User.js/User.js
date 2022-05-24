import Navbar from "../navbar/navbar";
import Posts from "./posts/Post.js";
import About from "./about/About";
import Photos from "./photos/Photos";
import Friends from "./friends/Friends";
import "./user.css";
import contact from "../../image/contact.png";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate, useParams } from "react-router-dom";
import NewPosts from "./newPosts/newPosts";
import AboutPopUp from "./about/AboutPopUpcomponent/AboutPopUp";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
function User() {
  const navigate = useNavigate();

  const [page, setPage] = useState("POST");
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const { USERID } = useParams();
  const [own, setown] = useState(false);
  var user;
  const profilePic = user ? "" : "";
  const toggleCreatePost = useSelector(
    (state) => state.globle.toggleCreatePost
  );
  const backgroundColor = useSelector(
    (state) => state.darkLight.backgroundColor
  );
  const toggleAboutPopUp = useSelector(
    (state) => state.globle.toggleAboutPopUp
  );
  useEffect(() => {
    USERID == USER.id ? setown(true) : setown(false);
  });
  return (
    <div>
      {toggleCreatePost ? <NewPosts /> : null}
      {toggleAboutPopUp ? <AboutPopUp /> : null}

      <Navbar />
      <div>
        <div className="profileBackground">
          <fieldset className="profile" style={{ position: "relative" }}>
            {/* <img
            src="https://www.lambdatest.com/blog/wp-content/uploads/2021/07/ezgif.com-gif-maker-25.gif"
            alt=""
          /> */}
            <legend
              style={{ position: "absolute", bottom: "-80px", left: "30px" }}
            >
              <div style={{ border: "none", position: " relative" }}>
                <img className="profilePic" src={contact} alt="" />
                {own ? (
                  <div
                    style={{
                      position: "absolute",
                      height: "36px",
                      width: "36px",
                      borderRadius: "50%",
                      backgroundColor: "green",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      bottom: "10px",
                      right: "10px",
                    }}
                  >
                    <CameraAltIcon sx={{ color: "white" }} />
                  </div>
                ) : null}
              </div>
            </legend>
          </fieldset>
        </div>

        <div className="username">
          <div>
            <h1 style={{ marginLeft: "200px" }}>
              {USER?.firstName + " " + USER?.lastName}
            </h1>
            <div
              className="button"
              style={{
                display: "flex",
                float: "right",
              }}
            >
              {own ? (
                <>
                  <Button
                    sx={{ width: "115px", height: "36px", margin: "0  7px" }}
                    variant="contained"
                  >
                    <AddCircleIcon sx={{ fontSize: 20 }} />
                    <p> Story</p>
                  </Button>
                  <Button
                    sx={{ width: "115px", height: "36px", margin: "0  7px" }}
                    variant="contained"
                  >
                    <EditIcon sx={{ fontSize: 20 }} />
                    <p>Profile</p>
                  </Button>
                </>
              ) : (
                <Button
                  sx={{ width: "150px", height: "36px", margin: "0  7px" }}
                  variant="contained"
                >
                  <AddCircleIcon sx={{ fontSize: 20 }} />
                  <p> Add Friend</p>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="userBodyNav">
          <div>
            <li className="posts __active" onClick={() => setPage("POST")}>
              <p>Posts</p>
            </li>

            <li className="About" onClick={() => setPage("ABOUT")}>
              <p>About</p>
            </li>
            <li className="Friends" onClick={() => setPage("FRIENDS")}>
              <p>Friends</p>
            </li>
            <li className="Photos" onClick={() => setPage("PHOTOS")}>
              <p> Photos</p>
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
