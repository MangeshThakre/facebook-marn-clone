import React, { useEffect } from "react";
import "../AboutPopUpcomponent/AboutPopUp.css";
import Card from "@mui/material/Card";
import CloseIcon from "@mui/icons-material/Close";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  togglseConformDeletePopup,
  deleteItem,
  indexNo,
} from "../../../../redux/aboutPAgeSplice.js";
import { toggleAboutPopUp } from "../../../../redux/globleSplice.js";
import { IconButton } from "@mui/material";
import {
  currentCity,
  homeTown,
  workPlace,
  college,
  school,
  familyMember,
} from "../../../../redux/userSplice.js";
import { setAboutOption } from "../../../../redux/aboutPAgeSplice.js";
import { setPage } from "../../../../redux/userSplice.js";

export function AboutPopUp() {
  const dispatch = useDispatch();

  const WORKPLACE = useSelector((state) => state.user.workPlace);
  const COLLEGE = useSelector((state) => state.user.college);
  const SCHOOL = useSelector((state) => state.user.school);
  const HOMETOWN = useSelector((state) => state.user.homeTown);
  const CURRENTCITY = useSelector((state) => state.user.currentCity);
  const JOINEDATE = useSelector((state) => state.user.userDetail.created_at);

  const joiningDate = new Date(JOINEDATE).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function setAboutOption_(option) {
    dispatch(setAboutOption(option));
    dispatch(setPage("ABOUT"));
    dispatch(toggleAboutPopUp(false));
  }

  function WorkplaceSwitch(e, i) {
    return (
      <div className="switchButtonDiv">
        <FormControlLabel
          control={<Switch defaultChecked />}
          label={"Works at " + e.company}
        />
        <IconButton
          onClick={() => {
            setAboutOption_("WorkAndEducation");
          }}
        >
          <EditIcon />
        </IconButton>
      </div>
    );
  }

  function heighSchoolSwitch(e, i) {
    return (
      <div className="switchButtonDiv">
        <FormControlLabel
          control={<Switch defaultChecked />}
          label={"Studied  at " + e.school_college_name}
        />
        <IconButton
          onClick={() => {
            setAboutOption_("WorkAndEducation");
          }}
        >
          <EditIcon />
        </IconButton>
      </div>
    );
  }

  function collegeSwitch(e, i) {
    return (
      <div className="switchButtonDiv">
        <FormControlLabel
          control={<Switch defaultChecked />}
          label={"Works at " + e.school_college_name}
        />
        <IconButton
          onClick={() => {
            setAboutOption_("WorkAndEducation");
          }}
        >
          <EditIcon />
        </IconButton>
      </div>
    );
  }

  function currentCitySwitch() {
    if (Object.keys(CURRENTCITY).length > 0) {
      return (
        <div className="switchButtonDiv">
          <FormControlLabel
            control={<Switch defaultChecked={CURRENTCITY.showIntro} />}
            label={"Lives in " + CURRENTCITY.city}
          />
          <IconButton
            onClick={() => {
              setAboutOption_("Placeslived");
            }}
          >
            <EditIcon />
          </IconButton>
        </div>
      );
    } else {
      return (
        <div onClick={() => setAboutOption_("Placeslived")}>
          <AddCircleOutlineIcon
            sx={{ color: "#1976d2 ", height: "32px", width: "32px" }}
          />
          <p>Add current city</p>
        </div>
      );
    }
  }

  function homeTownSwitch() {
    if (Object.keys(HOMETOWN).length > 0) {
      return (
        <div className="switchButtonDiv">
          <FormControlLabel
            control={<Switch defaultChecked={HOMETOWN.showIntro} />}
            label={"Works at " + HOMETOWN.city}
          />
          <IconButton
            onClick={() => {
              setAboutOption_("Placeslived");
            }}
          >
            <EditIcon />
          </IconButton>
        </div>
      );
    } else {
      return (
        <div onClick={() => setAboutOption_("Placeslived")}>
          <AddCircleOutlineIcon
            sx={{ color: "#1976d2 ", height: "32px", width: "32px" }}
          />
          <p>Add HomeTown</p>
        </div>
      );
    }
  }

  return (
    <div
      className="aboutComponentBody"
      style={{ backgroundColor: "rgba(250, 252, 252, 0.689)" }}
    >
      <div className="aboutpopupBox">
        <Card sx={{ borderRadius: "7px" }}>
          <div className="aboutpopup_head">
            <div></div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3>Create Post</h3>
            </div>
            <div className="aboutpopup_close">
              <IconButton
                onClick={() => {
                  dispatch(toggleAboutPopUp(false));
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <Divider />

          <CardContent>
            <div className="AboutPopPuoBody">
              <h3> Customize your intro</h3>
              <p className="subStaticP">Details you select will be public.</p>
              <div>
                <p>Work</p>
                {WORKPLACE.length > 0
                  ? WORKPLACE.map((e, i) => {
                      return WorkplaceSwitch(e, i);
                    })
                  : null}

                <div onClick={() => setAboutOption_("WorkAndEducation")}>
                  <AddCircleOutlineIcon
                    sx={{ color: "#1976d2 ", height: "32px", width: "32px" }}
                  />
                  <p>add a Work Place</p>
                </div>
              </div>
              <div>
                <p>Education</p>
                {SCHOOL.length > 0
                  ? SCHOOL.map((e, i) => {
                      return heighSchoolSwitch(e, i);
                    })
                  : null}

                <div onClick={() => setAboutOption_("WorkAndEducation")}>
                  <AddCircleOutlineIcon
                    sx={{ color: "#1976d2 ", height: "32px", width: "32px" }}
                  />
                  <p>Add a high school</p>
                </div>

                {SCHOOL.length > 0
                  ? COLLEGE.map((e, i) => {
                      return collegeSwitch(e, i);
                    })
                  : null}

                <div onClick={() => setAboutOption_("WorkAndEducation")}>
                  <AddCircleOutlineIcon
                    sx={{ color: "#1976d2 ", height: "32px", width: "32px" }}
                  />
                  <p>Add a College</p>
                </div>
              </div>
              <div className="AboutSwitch">
                <p>Current City</p>

                {currentCitySwitch()}
              </div>
              <div>
                <p>Hometown</p>
                {homeTownSwitch()}
              </div>
              <div className="AboutSwitch">
                <p>Relationship</p>
                <div>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Single"
                  />
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </div>
              </div>
              <div className="AboutSwitch">
                <p>Joined Facebook</p>
                <div>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label={joiningDate}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <Divider />
          <CardContent>
            <div className="AboutPopPuoFooter">
              <div
                className="p"
                onClick={() => {
                  setAboutOption_("Overview");
                }}
              >
                {/* <p>Update Your Information</p> */}
              </div>
              <div>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => {
                      dispatch(toggleAboutPopUp(false));
                    }}
                  >
                    Cancle
                  </Button>
                </div>
                <Button variant="contained">Save</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ConfirmDeletPopup() {
  const dispatch = useDispatch();
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const type = useSelector((state) => state.about.deleteItem);
  const INDEXNO = useSelector((state) => state.about.indexNo);
  const WORKPLACE = useSelector((state) => state.user.workPlace);
  const COLLEGE = useSelector((state) => state.user.college);
  const SCHOOL = useSelector((state) => state.user.school);
  const FAMILYMEMBER = useSelector((state) => state.user.familyMember);

  console.log(type);
  async function remove() {
    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/remove",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: { type, indexNo: INDEXNO },
      });
      const data = await response.data;
      console.log(data);
      if (data == "deleted") {
        if (type == "homeTown") dispatch(homeTown({}));
        if (type == "current City") dispatch(currentCity({}));
        if (type == "workplace") {
          var newWorkPlace = [];
          WORKPLACE.forEach((e, i) => {
            if (i != INDEXNO) newWorkPlace.push(e);
          });
          dispatch(workPlace(newWorkPlace));
        }
        if (type == "college") {
          var newWorkPlace = [];
          COLLEGE.forEach((e, i) => {
            if (i != INDEXNO) newWorkPlace.push(e);
          });
          dispatch(college(newWorkPlace));
        }
        if (type == "school") {
          var newWorkPlace = [];
          SCHOOL.forEach((e, i) => {
            if (i != INDEXNO) newWorkPlace.push(e);
          });
          dispatch(school(newWorkPlace));
        }
        if (type == "familyMember") {
          var newarr = [];
          FAMILYMEMBER.forEach((e, i) => {
            if (i != INDEXNO) newarr.push(e);
          });
          dispatch(familyMember(newarr));
        }
      }
      dispatch(togglseConformDeletePopup(false));
      dispatch(deleteItem(""));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className="aboutComponentBody"
      style={{ backgroundColor: "rgba(250, 252, 252, 0.689)" }}
    >
      <div className="aboutpopupBox">
        <Card sx={{ borderRadius: "7px" }}>
          <div className="aboutpopup_head">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3>Are you Sure?</h3>
            </div>
            <div className="aboutpopup_close">
              <IconButton
                onClick={() => {
                  dispatch(togglseConformDeletePopup(false));
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          <Divider />
          <CardContent>
            <div>
              <p>Are you sure you want to remove this from your profile?</p>
            </div>
          </CardContent>

          <CardContent>
            <div className="AboutPopPuoFooter">
              <div></div>
              <div>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => {
                      dispatch(togglseConformDeletePopup(false));
                      dispatch(deleteItem(""));
                      dispatch(indexNo(""));
                    }}
                  >
                    Cancle
                  </Button>
                </div>
                <Button onClick={() => remove()} variant="contained">
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
