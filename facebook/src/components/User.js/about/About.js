import React from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect } from "react";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  toggleOverview,
  toggleWorkAndEducation,
  togglePlaceslived,
  toggleContactBasicInformation,
  toggleFamilyAndRelation,
} from "../../../redux/aboutPAgeSplice.js";
import "./About.css";
function About() {
  const dispatch = useDispatch();
  const aboutLeftOptionsRef = useRef(null);
  const bottomViewRef = useRef(null);
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const birthDay = new Date(USER.DOB).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
  });
  const BirthYear = new Date(USER.DOB).getFullYear();

  const toggleOverview_ = useSelector((state) => state.about.toggleOverview);
  const togglePlaceslived_ = useSelector(
    (state) => state.about.togglePlaceslived
  );
  const toggleWorkAndEducation_ = useSelector(
    (state) => state.about.toggleWorkAndEducation
  );
  const toggleFamilyAndRelation_ = useSelector(
    (state) => state.about.toggleFamilyAndRelation
  );
  const toggleContactBasicInformation_ = useSelector(
    (state) => state.about.toggleContactBasicInformation
  );

  function activeOption(current_li) {
    const aboutLeftOptions = aboutLeftOptionsRef.current.children;
    for (const li of aboutLeftOptions) {
      if (li.className == "activeOption") li.className = "inActive";
    }
    current_li.currentTarget.className = "activeOption";
  }
  useEffect(() => {
    dispatch(toggleOverview(true));
    dispatch(toggleWorkAndEducation(false));
    dispatch(togglePlaceslived(false));
    dispatch(toggleContactBasicInformation(false));
    dispatch(toggleFamilyAndRelation(false));
  }, []);

  const Overview = (
    <div>
      <h3>OverView</h3>
    </div>
  );
  const WorkAndEducation = (
    <>
      <div className="aboutEdit">
        <p>Work</p>
        <div>
          <AddCircleOutlineIcon />
          <p>Add a Work Space</p>
        </div>
      </div>
      <div className="aboutEdit">
        <p>College</p>
        <div>
          <AddCircleOutlineIcon />
          <p>Add a College</p>
        </div>
      </div>
      <div className="aboutEdit">
        <p>High School</p>
        <div>
          <AddCircleOutlineIcon />
          <p>Add a high school</p>
        </div>
      </div>
    </>
  );
  const Placeslived = (
    <div className="aboutEdit">
      <p>Places lived</p>
      <div>
        <AddCircleOutlineIcon />
        <p>Add Current City</p>
      </div>
      <div>
        <AddCircleOutlineIcon />
        <p>Add hometown</p>
      </div>
      <div>
        <AddCircleOutlineIcon />
        <p>add city</p>
      </div>
    </div>
  );
  const ContactBasicInformation = (
    <>
      <div className="aboutStatic">
        <p>Contact info</p>
        <div>
          <CallIcon />
          <div>
            <div>
              <p>{USER.phoneNo}</p>
              <p className="subStaticP">Mobile</p>
            </div>
          </div>
        </div>
      </div>
      <div className="aboutStatic">
        <p>Basic info</p>
        <div>
          <PersonIcon />
          <div>
            <div>
              <p>{}</p>
              <p className="subStaticP">Mobile</p>
            </div>
          </div>
        </div>
        <div>
          <CakeIcon />
          <div>
            <div>
              <p>{birthDay}</p>
              <p className="subStaticP">Birth Date</p>
            </div>
            <div>
              <p>{BirthYear}</p>
              <p className="subStaticP">Birth year</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  const FamilyAndRelation = (
    <>
      <div className="aboutStatic">
        <p>Relationship</p>
        <div>
          <FavoriteIcon />
          <div>
            <div>
              <p>{USER.phoneNo}</p>
              <p className="subStaticP"></p>
            </div>
          </div>
        </div>
      </div>
      <div className="aboutEdit">
        <p>Family members</p>
        <div>
          <AddCircleOutlineIcon />
          <p>Add a family member</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="About">
      <Card>
        <Grid container>
          <Grid xs={12} md={4.5}>
            <CardContent>
              <div className="about_left">
                <div>
                  <h3>About</h3>
                </div>
                <ul className="aboutLeftOptions" ref={aboutLeftOptionsRef}>
                  <li
                    className="activeOption"
                    onClick={(e) => {
                      activeOption(e);
                      dispatch(toggleWorkAndEducation(false));
                      dispatch(togglePlaceslived(false));
                      dispatch(toggleContactBasicInformation(false));
                      dispatch(toggleFamilyAndRelation(false));
                      dispatch(toggleOverview(true));
                      bottomViewRef.current.scrollIntoView();
                    }}
                  >
                    <div>
                      <p>Overview</p>
                    </div>
                  </li>
                  <li
                    className="inActive"
                    onClick={(e) => {
                      activeOption(e);
                      dispatch(toggleOverview(false));
                      dispatch(togglePlaceslived(false));
                      dispatch(toggleContactBasicInformation(false));
                      dispatch(toggleFamilyAndRelation(false));
                      dispatch(toggleWorkAndEducation(true));
                      bottomViewRef.current.scrollIntoView();
                    }}
                  >
                    <div>
                      <p>Work And Education</p>
                    </div>
                  </li>
                  <li
                    className="inActive"
                    onClick={(e) => {
                      activeOption(e);
                      dispatch(toggleOverview(false));
                      dispatch(toggleWorkAndEducation(false));
                      dispatch(toggleContactBasicInformation(false));
                      dispatch(toggleFamilyAndRelation(false));
                      dispatch(togglePlaceslived(true));
                      bottomViewRef.current.scrollIntoView();
                    }}
                  >
                    <div>
                      <p>Places lived</p>
                    </div>
                  </li>
                  <li
                    className="inActive"
                    onClick={(e) => {
                      activeOption(e);
                      dispatch(toggleOverview(false));
                      dispatch(toggleWorkAndEducation(false));
                      dispatch(toggleFamilyAndRelation(false));
                      dispatch(togglePlaceslived(false));
                      dispatch(toggleContactBasicInformation(true));
                      bottomViewRef.current.scrollIntoView();
                    }}
                  >
                    <div>
                      <p>Contact basic information </p>
                    </div>
                  </li>
                  <li
                    className="inActive"
                    onClick={(e) => {
                      activeOption(e);
                      dispatch(toggleOverview(false));
                      dispatch(toggleWorkAndEducation(false));
                      dispatch(toggleContactBasicInformation(false));
                      dispatch(togglePlaceslived(false));
                      dispatch(toggleFamilyAndRelation(true));
                      bottomViewRef.current.scrollIntoView();
                    }}
                  >
                    <div>
                      <p>Family and Relation</p>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Grid>
          <Grid xs={12} md={6}>
            <CardContent>
              <div className="about_right">
                {toggleOverview_ ? Overview : null}
                {togglePlaceslived_ ? Placeslived : null}
                {toggleWorkAndEducation_ ? WorkAndEducation : null}
                {toggleFamilyAndRelation_ ? FamilyAndRelation : null}
                {toggleContactBasicInformation_
                  ? ContactBasicInformation
                  : null}
              </div>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <div ref={bottomViewRef}></div>
    </div>
  );
}

export default About;
