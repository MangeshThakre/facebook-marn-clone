import React from "react";
import Grid from "@mui/material/Grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CallIcon from "@mui/icons-material/Call";
import CakeIcon from "@mui/icons-material/Cake";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAboutOption } from "../../../redux/aboutPAgeSplice.js";
import { useParams } from "react-router-dom";

import {
  PlaceLived,
  Familymembers,
  AddWorkPlace,
  AddStudiedAt,
  ShowCity,
  ShowWorkEduList,
  ShowCollegeSchoollist,
  ShowList,
} from "./AboutAssOptions/aboutOptions.js";
import "./About.css";

function About() {
  const dispatch = useDispatch();
  const { USERID } = useParams();
  const aboutLeftOptionsRef = useRef(null);
  const bottomViewRef = useRef(null);
  const [toggleCurrentCity, setToggleCurrentCity] = useState(false);
  const [toggleAddHometown, setToggleAddHometown] = useState(false);
  const [toggleWorkPlace, setTogglseWorkPlace] = useState(false);
  const [togglefamilyMember, setTogglefamilyMember] = useState(false);
  const [toggleCollege, setTogglecollege] = useState(false);
  const [toggleSchool, setTogglseSchool] = useState(false);
  const PROFILEUSER = useSelector((state) => state.user.userDetail);
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));

  const setAboutOption_ = useSelector((state) => state.about.setAboutOption);
  const HOMETOWN = useSelector((state) => state.user.homeTown);
  const CURRENTCITY = useSelector((state) => state.user.currentCity);
  const WORKPLACE = useSelector((state) => state.user.workPlace);
  const COLLEGE = useSelector((state) => state.user.college);
  const SCHOOL = useSelector((state) => state.user.school);
  const FAMILYMEMBER = useSelector((state) => state.user.familyMember);

  const birthDay = new Date(PROFILEUSER.DOB).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
  });
  const BirthYear = new Date(PROFILEUSER.DOB).getFullYear();
  const joinAt = new Date(PROFILEUSER.created_at).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  // console.log(PROFILEUSER);

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
      <>
        {WorkAndEducation("overView")}
        {Placeslived("overView")}
      </>
    );
  }

  function WorkAndEducation(overview = "") {
    function showEdit(type) {
      if (type == "workplace") {
        return (
          <div
            className="aboutEditDiv"
            onClick={() => setTogglseWorkPlace(true)}
          >
            <AddCircleOutlineIcon />
            <p>Add a Workplce</p>
          </div>
        );
      }
      if (type == "college") {
        return (
          <div className="aboutEditDiv" onClick={() => setTogglecollege(true)}>
            <AddCircleOutlineIcon />
            <p>Add a College</p>
          </div>
        );
      }
      if (type == "school") {
        return (
          <div className="aboutEditDiv" onClick={() => setTogglseSchool(true)}>
            <AddCircleOutlineIcon />
            <p>Add a high school</p>
          </div>
        );
      }
    }

    function showWorkPlaceList() {
      return (
        <>
          {WORKPLACE.map((obj, i) => {
            return (
              <ShowWorkEduList
                key={i}
                obj={obj}
                itemType={"workplace"}
                indexNo={i}
                open={setTogglseWorkPlace}
              />
            );
          })}
        </>
      );
    }

    function showCollegeList() {
      return (
        <>
          {COLLEGE.map((obj, i) => {
            return (
              <ShowCollegeSchoollist
                key={i}
                obj={obj}
                itemType={"college"}
                indexNo={i}
                open={setTogglecollege}
              />
            );
          })}
        </>
      );
    }

    function showSchoolList() {
      return (
        <>
          {SCHOOL.map((obj, i) => {
            return (
              <ShowCollegeSchoollist
                key={i}
                obj={obj}
                itemType={"school"}
                indexNo={i}
                open={setTogglseSchool}
              />
            );
          })}
        </>
      );
    }

    function showNotAdded(type) {
      if (type == "workplace") {
        return (
          <div className="notEdit">
            <WorkIcon />
            <p> {type} not Added</p>
          </div>
        );
      }
      if (type == "college") {
        return (
          <div className="notEdit">
            <SchoolIcon />
            <p> {type} not Added</p>
          </div>
        );
      }
      if (type == "school") {
        return (
          <div className="notEdit">
            <SchoolIcon />
            <p> {type} not Added</p>
          </div>
        );
      }
    }

    function showEditor(type) {
      if (type == "workplace") {
        return (
          <AddWorkPlace
            setTogglseWorkPlace={setTogglseWorkPlace}
            type={"workplace"}
          />
        );
      }

      if (type == "college")
        return <AddStudiedAt close={setTogglecollege} type={"college"} />;

      if (type == "school")
        return <AddStudiedAt close={setTogglseSchool} type={"school"} />;
    }

    function WorkPlace() {
      if (USERID == USER.id) {
        if (toggleWorkPlace) {
          return showEditor("workplace");
        } else if (WORKPLACE.length == 0) {
          return (
            <>
              {overview == "overView"
                ? showNotAdded("workplace")
                : showEdit("workplace")}
            </>
          );
        } else {
          const listAndEdit = (
            <>
              {showEdit("workplace")} {showWorkPlaceList()}
            </>
          );
          return (
            <>{overview == "overView" ? showWorkPlaceList() : listAndEdit}</>
          );
        }
      } else if (WORKPLACE.length == 0) {
        return showNotAdded("workplace");
      } else return showWorkPlaceList();
    }

    function college() {
      if (USERID == USER.id) {
        if (toggleCollege) {
          return showEditor("college");
        } else if (COLLEGE.length == 0) {
          return (
            <>
              {overview == "overView"
                ? showNotAdded("college")
                : showEdit("college")}
            </>
          );
        } else {
          const listAndEdit = (
            <>
              {showEdit("college")} {showCollegeList()}
            </>
          );
          return (
            <>{overview == "overView" ? showCollegeList() : listAndEdit}</>
          );
        }
      } else if (COLLEGE.length == 0) {
        return showNotAdded("college");
      } else return showWorkPlaceList();
    }

    function school() {
      if (USERID == USER.id) {
        if (toggleSchool) {
          return showEditor("school");
        } else if (SCHOOL.length == 0) {
          return (
            <>
              {overview == "overView"
                ? showNotAdded("school")
                : showEdit("school")}
            </>
          );
        } else {
          const listAndEdit = (
            <>
              {showEdit("school")}
              {showSchoolList()}
            </>
          );
          return <>{overview == "overView" ? showSchoolList() : listAndEdit}</>;
        }
      } else if (SCHOOL.length == 0) {
        return showNotAdded("school");
      } else return showWorkPlaceList();
    }

    return (
      <>
        <div className="aboutEdit">
          <p>Work</p>
          {WorkPlace()}
        </div>
        <div className="aboutEdit">
          <p>College</p>
          {college()}
        </div>
        <div className="aboutEdit">
          <p>High School</p>
          {school()}
        </div>
      </>
    );
  }

  function Placeslived() {
    const showCurrentCity = (
      <div className="aboutEditDiv" onClick={() => setToggleCurrentCity(true)}>
        <AddCircleOutlineIcon />
        <p>Add Current City</p>
      </div>
    );

    const showEditCurrentCity = (
      <ShowCity
        obj={CURRENTCITY}
        Citytype={"current City"}
        open={setToggleCurrentCity}
      />
    );

    const noCurrentCity = (
      <div className="notEdit" onClick={() => setToggleCurrentCity(true)}>
        <LocationOnIcon />
        <p> Current City not Added</p>
      </div>
    );

    const showHomeTown = (
      <div className="aboutEditDiv" onClick={() => setToggleAddHometown(true)}>
        <AddCircleOutlineIcon />
        <p>Add hometown</p>
      </div>
    );

    const showEditHomeTown = (
      <ShowCity
        obj={HOMETOWN}
        Citytype={"homeTown"}
        open={setToggleAddHometown}
      />
    );

    const noHometown = (
      <div className="notEdit" onClick={() => setToggleCurrentCity(true)}>
        <LocationOnIcon />
        <p> Home Town not Added</p>
      </div>
    );

    function addCurrentCity() {
      if (USERID == USER.id) {
        if (toggleCurrentCity) {
          return (
            <PlaceLived close={setToggleCurrentCity} type={"CurrentCity"} />
          );
        } else if (Object.keys(CURRENTCITY).length === 0) {
          return showCurrentCity;
        } else return showEditCurrentCity;
      } else if (Object.keys(CURRENTCITY).length === 0) {
        return noCurrentCity;
      } else return showEditCurrentCity;
    }

    function addHomeTown() {
      if (USERID == USER.id) {
        if (toggleAddHometown) {
          return <PlaceLived close={setToggleAddHometown} type={"Hometown"} />;
        } else if (Object.keys(HOMETOWN).length === 0) {
          return showHomeTown;
        } else return showEditHomeTown;
      } else if (Object.keys(HOMETOWN).length === 0) {
        return noHometown;
      } else return showEditHomeTown;
    }

    return (
      <div className="aboutEdit">
        <p>Places lived</p>
        {addCurrentCity()}
        {addHomeTown()}
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
                <p>{PROFILEUSER.phoneNo}</p>
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
                <p>{joinAt}</p>
                <p className="subStaticP">Join at</p>
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
    function showNotAdded(type) {
      return (
        <div className="notEdit">
          <FamilyRestroomIcon />
          <p> {type} not Added</p>
        </div>
      );
    }
    function showList() {
      return (
        <>
          {FAMILYMEMBER.map((e, i) => {
            return (
              <ShowList
                obj={e}
                indexNo={i}
                key={i}
                open={setTogglefamilyMember}
                itemType={"familyMember"}
              />
            );
          })}
        </>
      );
    }
    function showEditor() {
      return (
        <Familymembers
          setTogglefamilyMember={setTogglefamilyMember}
          type="familyMember"
        />
      );
    }
    function showEdit() {
      return (
        <div
          className="aboutEditDiv"
          onClick={() => setTogglefamilyMember(true)}
        >
          <AddCircleOutlineIcon />
          <p>Add a family member</p>
        </div>
      );
    }
    function familyMember() {
      if (USERID == USER.id) {
        if (togglefamilyMember) {
          return showEditor();
        } else if (FAMILYMEMBER.length == 0) {
          return showEdit();
        } else
          return (
            <>
              {showEdit()}
              {showList()}
            </>
          );
      } else if (FAMILYMEMBER.length == 0) {
        return showNotAdded("family member");
      } else return showList();
    }

    return (
      <>
        <div className="aboutStatic">
          <p>Relationship</p>
          <div>
            <FavoriteIcon />
            <div>
              <div>
                <p>Single</p>
                <p className="subStaticP"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="aboutEdit">
          <p>Family members</p>

          {familyMember()}
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
                <div style={{ height: "100px" }}></div>
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
