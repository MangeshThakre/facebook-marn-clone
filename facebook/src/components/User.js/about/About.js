import React from "react";
import Grid from "@mui/material/Grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CallIcon from "@mui/icons-material/Call";
import CakeIcon from "@mui/icons-material/Cake";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAboutOption } from "../../../redux/aboutPAgeSplice.js";
import {
  PlaceLived,
  Familymembers,
  AddWorkPlace,
  AddStudiedAt,
  AddCurrentCity,
} from "./AboutAssOptions/aboutOptions.js";
import "./About.css";

function About() {
  const dispatch = useDispatch();
  const aboutLeftOptionsRef = useRef(null);
  const bottomViewRef = useRef(null);
  const [toggleCurrentCity, setToggleCurrentCity] = useState(false);
  const [toggleAddHometown, setToggleAddHometown] = useState(false);
  const [togglefamilyMember, setTogglefamilyMember] = useState(false);
  const [toggleWorkPlace, setTogglseWorkPlace] = useState(false);
  const [toggleStudiedAt, setToggleStudiedAt] = useState(false);
  const [toggleSchool, setTogglseSchool] = useState(false);
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const setAboutOption_ = useSelector((state) => state.about.setAboutOption);
  const HOMETOWN = useSelector((state) => state.user.homeTown);
  const CURRENTCITY = useSelector((state) => state.user.currentCity);
  const birthDay = new Date(USER.DOB).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
  });
  const BirthYear = new Date(USER.DOB).getFullYear();

  useEffect(() => {
    const options = aboutLeftOptionsRef.current.childNodes;
    for (const li of options) {
      const [className, isActive] = li.className.split(" ");
      li.className = "";
      if (className == setAboutOption_) {
        li.className = className + " activeOption";
      } else {
        li.className = className + " inActive";
      }
    }
  }, [setAboutOption_]);

  function activeOption(option) {
    dispatch(setAboutOption(option));
    bottomViewRef.current.scrollIntoView();
  }

  function Overview() {
    return (
      <div>
        <h3>OverView</h3>
      </div>
    );
  }

  function WorkAndEducation() {
    return (
      <>
        <div className="aboutEdit">
          <p>Work</p>

          {toggleWorkPlace ? (
            <AddWorkPlace setTogglseWorkPlace={setTogglseWorkPlace} />
          ) : (
            <div
              className="aboutEditDiv"
              onClick={() => setTogglseWorkPlace(true)}
            >
              <AddCircleOutlineIcon />
              <p>Add a Work Space</p>
            </div>
          )}
        </div>
        <div className="aboutEdit">
          <p>College</p>
          {toggleStudiedAt ? (
            <AddStudiedAt close={setToggleStudiedAt} />
          ) : (
            <div
              className="aboutEditDiv"
              onClick={() => setToggleStudiedAt(true)}
            >
              <AddCircleOutlineIcon />
              <p>Add a College</p>
            </div>
          )}
        </div>
        <div className="aboutEdit">
          <p>High School</p>

          {toggleSchool ? (
            <AddStudiedAt close={setTogglseSchool} />
          ) : (
            <div
              className="aboutEditDiv"
              onClick={() => setTogglseSchool(true)}
            >
              <AddCircleOutlineIcon />
              <p>Add a high school</p>
            </div>
          )}
        </div>
      </>
    );
  }

  function Placeslived() {
    const addCurrentCity =
      Object.keys(CURRENTCITY).length === 0 ? (
        <div
          className="aboutEditDiv"
          onClick={() => setToggleCurrentCity(true)}
        >
          <AddCircleOutlineIcon />
          <p>Add Current City</p>
        </div>
      ) : (
        <AddCurrentCity
          obj={CURRENTCITY}
          Citytype={"current City"}
          open={setToggleCurrentCity}
        />
      );

    const addHomeTown =
      Object.keys(HOMETOWN).length === 0 ? (
        <div
          className="aboutEditDiv"
          onClick={() => setToggleAddHometown(true)}
        >
          <AddCircleOutlineIcon />
          <p>Add hometown</p>
        </div>
      ) : (
        <AddCurrentCity
          obj={HOMETOWN}
          Citytype={"homeTown"}
          open={setToggleAddHometown}
        />
      );

    return (
      <div className="aboutEdit">
        <p>Places lived</p>

        {toggleCurrentCity ? (
          <PlaceLived close={setToggleCurrentCity} type={"CurrentCity"} />
        ) : (
          addCurrentCity
        )}

        {toggleAddHometown ? (
          <PlaceLived close={setToggleAddHometown} type={"Hometown"} />
        ) : (
          addHomeTown
        )}
      </div>
    );
  }

  function ContactBasicInformation() {
    return (
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
  }

  function FamilyAndRelation() {
    return (
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
          {togglefamilyMember ? (
            <Familymembers setTogglefamilyMember={setTogglefamilyMember} />
          ) : (
            <div
              className="aboutEditDiv"
              onClick={() => setTogglefamilyMember(true)}
            >
              <AddCircleOutlineIcon />
              <p>Add a family member</p>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="About">
      <Card>
        <Grid container>
          <Grid xs={12} md={4}>
            <CardContent>
              <div className="about_left">
                <div>
                  <h3>About</h3>
                </div>
                <ul className="aboutLeftOptions" ref={aboutLeftOptionsRef}>
                  <li
                    className="Overview activeOption"
                    onClick={() => activeOption("Overview")}
                  >
                    <div>
                      <p>Overview</p>
                    </div>
                  </li>
                  <li
                    className="WorkAndEducation inActive"
                    onClick={() => activeOption("WorkAndEducation")}
                  >
                    <div>
                      <p>Work And Education</p>
                    </div>
                  </li>
                  <li
                    className="Placeslived inActive"
                    onClick={(e) => activeOption("Placeslived")}
                  >
                    <div>
                      <p>Places lived</p>
                    </div>
                  </li>
                  <li
                    className="ContactBasicInformation inActive"
                    onClick={(e) => activeOption("ContactBasicInformation")}
                  >
                    <div>
                      <p>Contact basic information </p>
                    </div>
                  </li>
                  <li
                    className="FamilyAndRelation inActive"
                    onClick={(e) => activeOption("FamilyAndRelation")}
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
                {setAboutOption_ == "Overview" ? Overview() : null}
                {setAboutOption_ == "Placeslived" ? Placeslived() : null}
                {setAboutOption_ == "WorkAndEducation"
                  ? WorkAndEducation()
                  : null}
                {setAboutOption_ == "FamilyAndRelation"
                  ? FamilyAndRelation()
                  : null}
                {setAboutOption_ == "ContactBasicInformation"
                  ? ContactBasicInformation()
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
