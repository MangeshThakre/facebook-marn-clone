import React, { useEffect } from "react";
import "./info.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import Button from "@mui/material/Button";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { useDispatch, useSelector } from "react-redux";
import { toggleAboutPopUp } from "../../../../redux/globleSplice.js";
import { bio } from "../../../../redux/userSplice.js";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
function Info() {
  const dispatch = useDispatch();
  const { USERID } = useParams();
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const [bio_button, setInfo_button] = useState(false);
  const [text_bio, setText_bio] = useState("");
  const [isBioTextLoading, setIsBioTextLoading] = useState(false);
  const BIO = useSelector((state) => state.user.bio);
  const WORKPLACE = useSelector((state) => state.user.workPlace);
  const COLLEGE = useSelector((state) => state.user.college);
  const SCHOOL = useSelector((state) => state.user.school);
  const HOMETOWN = useSelector((state) => state.user.homeTown);
  const CURRENTCITY = useSelector((state) => state.user.currentCity);
  const RELSTIONSHIP = useSelector((state) => state.user.relationship);

  const JOINEDAT = useSelector((state) => state.user.created_at);
  const joiningDate = new Date(JOINEDAT.joined_at).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  ///// dark mode
  const BACKGROUNDCOLOR_SUB_FANT = useSelector(
    (state) => state.darkLight.backgroundColor_sub_fant
  );
  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  const ICONCOLOR = useSelector((state) => state.darkLight.iconColor);
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);
  //
  useEffect(() => {
    setText_bio(BIO);
    setInfo_button(false);
  }, []);

  //   save bio text
  async function bioSave() {
    setIsBioTextLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/bio",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: { text_bio },
      });
      const data = response.data;
      if (data === "updated") {
        dispatch(bio(text_bio));
        setInfo_button(false);
        setIsBioTextLoading(false);
      }
    } catch (error) {
      console.log("eror", error);
      setIsBioTextLoading(false);
    }
  }

  const info = bio_button ? (
    <div className="info_component">
      <div className="info_component_upper">
        <input
          style={{
            color: ICONCOLOR,
            backgroundColor: BACKGROUNDCOLOR_SUB_FANT,
          }}
          value={text_bio}
          type="text"
          placeholder="Discribe who you are"
          onChange={(e) => setText_bio(e.target.value)}
        />
        <div>
          <p style={{ color: ICONCOLOR }}>
            {101 - text_bio?.length} characters remaining
          </p>
        </div>
      </div>
      <div className="info_component_lower">
        <div style={{ display: "flex", color: ICONCOLOR }}>
          <PublicOutlinedIcon />
          <p>Public</p>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setInfo_button(false);
              setText_bio(BIO);
            }}
          >
            cancle
          </Button>
          <Button
            variant="contained"
            disabled={text_bio.length > 100}
            onClick={() => {
              bioSave();
            }}
          >
            {isBioTextLoading ? (
              <CircularProgress sx={{ color: "white" }} size="1.6rem" />
            ) : (
              "save"
            )}
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ wordBreak: "break-all", color: ICONCOLOR }}>{BIO}</p>
      </div>
      {USERID == USER.id ? (
        <button
          onClick={() => {
            setInfo_button(true);
          }}
        >
          <p>Add bio</p>
        </button>
      ) : null}
    </>
  );

  const userDetail = (
    <>
      <div className="introUserDetail">
        {WORKPLACE.map((e, i) => {
          if (e?.showIntro)
            return (
              <div
                key={i}
                style={{ display: "flex", marginTop: "15px", color: FONTCOLOR }}
              >
                <WorkOutlinedIcon
                  sx={{ marginRight: "10px", color: ICONCOLOR }}
                />
                <p>
                  Works at <b> {e.company}</b>
                </p>
              </div>
            );
        })}
        {COLLEGE.map((e, i) => {
          if (e?.showIntro)
            return (
              <div
                key={i}
                style={{ display: "flex", marginTop: "15px", color: FONTCOLOR }}
              >
                <SchoolIcon sx={{ marginRight: "10px", color: ICONCOLOR }} />
                <p>
                  went to <b> {e.school_college_name}</b>
                </p>
              </div>
            );
        })}
        {SCHOOL.map((e, i) => {
          if (e?.showIntro)
            return (
              <div
                key={i}
                style={{ display: "flex", marginTop: "15px", color: FONTCOLOR }}
              >
                <SchoolIcon sx={{ marginRight: "10px", color: ICONCOLOR }} />
                <p>
                  studied at <b> {e.school_college_name}</b>
                </p>
              </div>
            );
        })}
        {CURRENTCITY?.showIntro ? (
          <div style={{ display: "flex", marginTop: "15px", color: FONTCOLOR }}>
            <HomeIcon sx={{ marginRight: "10px", color: ICONCOLOR }} />
            <p>
              Lives in <b> {CURRENTCITY.city}</b>
            </p>
          </div>
        ) : null}
        {HOMETOWN?.showIntro ? (
          <div style={{ display: "flex", marginTop: "15px", color: FONTCOLOR }}>
            <LocationOnIcon sx={{ marginRight: "10px", color: ICONCOLOR }} />
            <p>
              From <b> {HOMETOWN.city}</b>
            </p>
          </div>
        ) : null}
        {RELSTIONSHIP?.showIntro ? (
          <div style={{ display: "flex", marginTop: "15px", color: FONTCOLOR }}>
            <FavoriteIcon sx={{ marginRight: "10px", color: ICONCOLOR }} />
            <p>
              <b> {RELSTIONSHIP.relation}</b>
            </p>
          </div>
        ) : null}
        {JOINEDAT?.showIntro ? (
          <div style={{ display: "flex", marginTop: "15px", color: FONTCOLOR }}>
            <FavoriteIcon sx={{ marginRight: "10px", color: ICONCOLOR }} />
            <p>joined {joiningDate}</p>
          </div>
        ) : null}
      </div>

      {USERID == USER.id ? (
        <button onClick={() => dispatch(toggleAboutPopUp(true))}>
          <p>Edit Detail</p>
        </button>
      ) : null}
    </>
  );

  return (
    <div className="Intro">
      <Card
        sx={{ borderRadius: "10px", backgroundColor: SUB_BACKGROUND_COLOR }}
      >
        <CardContent>
          <h2 style={{ color: FONTCOLOR }}>Intro</h2>
          <div className="InfoButtons">
            {info}
            {userDetail}

            <button>
              <p>Edit hobbies</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Info;
