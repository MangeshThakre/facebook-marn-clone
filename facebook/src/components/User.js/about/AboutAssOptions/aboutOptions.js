import Divider from "@mui/material/Divider";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import PublicIcon from "@mui/icons-material/Public";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DatePicker from "react-date-picker";
import FormHelperText from "@mui/material/FormHelperText";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SchoolIcon from "@mui/icons-material/School";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  togglseConformDeletePopup,
  deleteItem,
  indexNo,
  toggleDropdown,
} from "../../../../redux/aboutPAgeSplice.js";
import WorkIcon from "@mui/icons-material/Work";
import { Card, CardContent } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import {
  currentCity,
  homeTown,
  workPlace,
  college,
  school,
  relationship,
  familyMember,
} from "../../../../redux/userSplice";
import { useSelector, useDispatch } from "react-redux";
import "./aboutOptions.css";
const URL = process.env.REACT_APP_API_URL;
const TOKEN = localStorage.getItem("TOKEN");
const USER = JSON.parse(localStorage.getItem("LOCALUSER"));

export function PlaceLived({ close, type }) {
  const dispatch = useDispatch();
  const CURRENTCITY = useSelector((state) => state.user.currentCity);
  const HOMETOWN = useSelector((state) => state.user.homeTown);
  var [place, setPlace] = useState("");

  useEffect(() => {
    if (Object.keys(CURRENTCITY).length != 0 && type == "CurrentCity") {
      const { city, type } = CURRENTCITY;
      setPlace(city);
    }
    if ((Object.keys(HOMETOWN).length != 0) & (type == "Hometown")) {
      const { city, type } = HOMETOWN;
      setPlace(city);
    }
  }, []);

  async function save() {
    try {
      // console.log(place);
      const response = await axios({
        method: "get",
        url: URL + `/api/about_info_?${type}=` + place,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      if (type == "CurrentCity") {
        await dispatch(currentCity({ city: place, type: "public" }));
      } else {
        await dispatch(homeTown({ city: place, type: "public" }));
      }
      close(false);
    } catch (error) {
      console.log("Error PlaceLived :", error);
    }
  }
  return (
    <div className="Editordiv">
      <div id="PlaceLivedTop">
        <TextField
          label={type}
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          name="numberformat"
          id="formatted-numberformat-input"
          variant="outlined"
        />
      </div>
      <Divider />
      <div id="PlaceLivedBottom">
        <Button variant="contained">
          <PublicIcon />
        </Button>
        <div>
          <Button variant="contained" onClick={() => close(false)}>
            Cancle
          </Button>
          <div>
            <Button
              variant="contained"
              disabled={place == ""}
              onClick={() => save()}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RelationShipEditor({ close, type }) {
  const dispatch = useDispatch();
  const optionsRef = useRef(null);
  const [relationStatus, setRelationStatus] = useState("");
  const TOGGLEDROPDOWN = useSelector((state) => state.about.toggleDropdown);
  const RELSTIONSHIP = useSelector((state) => state.user.relationship);
  const [isRelationLoading, setIsRelationLoading] = useState(false);
  useEffect(() => {
    setRelationStatus(
      RELSTIONSHIP.relation == "" ? "Status" : RELSTIONSHIP.relation
    );
  }, []);

  useEffect(() => {
    const options = optionsRef.current.childNodes;
    for (const li of options) {
      const className = li.className;
      li.id = "";
      if (className == relationStatus.replace(/ /g, "_")) {
        li.id = "activee";
      } else {
        li.id = "inActive";
      }
    }
  }, [TOGGLEDROPDOWN]);

  async function save() {
    setIsRelationLoading(true);
    const newData = {
      relation: relationStatus == "Status" ? "" : relationStatus,
      showIntro: RELSTIONSHIP.showIntro,
    };
    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/about_info_workPlace",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: { newData, type },
      });
      const data = await response.data;
      if (data == "updated") {
        dispatch(relationship(newData));
        close(false);
      }
    } catch (error) {
      setIsRelationLoading(true);
      console.log(error);
    }
  }

  return (
    <div className="Editordiv">
      <div className="Dropdown">
        <div className="selector">
          <div
            className="DropDownSelector"
            style={{ backgroundColor: "#e4e6eb" }}
            onClick={() => dispatch(toggleDropdown(!TOGGLEDROPDOWN))}
          >
            <p style={{ marginLeft: "20px", fontWeight: "bold" }}>
              {relationStatus}
            </p>
            <ArrowDropDownIcon />
          </div>
        </div>
        {TOGGLEDROPDOWN ? (
          <div className="dropDownOption">
            <Card>
              <ul ref={optionsRef}>
                <li
                  className="Status"
                  onClick={() => {
                    dispatch(toggleDropdown(!TOGGLEDROPDOWN));
                    setRelationStatus("Status");
                  }}
                >
                  <p>Status</p>
                </li>
                <li
                  className="Single"
                  onClick={() => {
                    dispatch(toggleDropdown(!TOGGLEDROPDOWN));
                    setRelationStatus("Single");
                  }}
                >
                  <p>Single</p>
                </li>
                <li
                  className="In_a_relationship"
                  onClick={() => {
                    dispatch(toggleDropdown(!TOGGLEDROPDOWN));
                    setRelationStatus("In a relationship");
                  }}
                >
                  <p>In a relationship</p>
                </li>
                <li
                  className="Engaged"
                  onClick={() => {
                    dispatch(toggleDropdown(!TOGGLEDROPDOWN));
                    setRelationStatus("Engaged");
                  }}
                >
                  <p>Engaged</p>
                </li>
                <li
                  className="Married"
                  onClick={() => {
                    dispatch(toggleDropdown(!TOGGLEDROPDOWN));
                    setRelationStatus("Married");
                  }}
                >
                  <p>Married</p>
                </li>
                <li
                  className="In_a_civil_union"
                  onClick={() => {
                    dispatch(toggleDropdown(!TOGGLEDROPDOWN));
                    setRelationStatus("In a civil union");
                  }}
                >
                  <p>In a civil union</p>
                </li>
                <li
                  className="In_a_domestic_partnership"
                  onClick={() => {
                    dispatch(toggleDropdown(!TOGGLEDROPDOWN));
                    setRelationStatus("In a domestic partnership");
                  }}
                >
                  <p>In a domestic partnership</p>
                </li>
                <li
                  className="In_an_open_relationship"
                  onClick={() => {
                    dispatch(toggleDropdown(!TOGGLEDROPDOWN));
                    setRelationStatus("In an open relationship");
                  }}
                >
                  <p>In an open relationship</p>
                </li>
                <li
                  className="It's_complicated"
                  onClick={() => {
                    dispatch(toggleDropdown(!TOGGLEDROPDOWN));
                    setRelationStatus("It's complicated");
                  }}
                >
                  <p>It's complicated</p>
                </li>
                <li
                  className="Separated"
                  onClick={() => {
                    dispatch(toggleDropdown(!TOGGLEDROPDOWN));
                    setRelationStatus("Separated");
                  }}
                >
                  <p>Separated</p>
                </li>
                <li
                  className="Divorced"
                  onClick={() => {
                    dispatch(toggleDropdown(!TOGGLEDROPDOWN));
                    setRelationStatus("Divorced");
                  }}
                >
                  <p>Divorced</p>
                </li>
                <li
                  className="Widowed"
                  onClick={() => {
                    dispatch(toggleDropdown(!TOGGLEDROPDOWN));
                    setRelationStatus("Widowed");
                  }}
                >
                  <p>Widowed</p>
                </li>
              </ul>
            </Card>
          </div>
        ) : (
          <div className="dropDownOption" style={{ display: "none" }}>
            <ul ref={optionsRef}>
              <li></li>
            </ul>
          </div>
        )}
      </div>
      <Divider sx={{ marginTop: "10px" }} />
      <div id="PlaceLivedBottom">
        <Button variant="contained">
          <PublicIcon />
        </Button>
        <div>
          <Button variant="contained" onClick={() => close(false)}>
            Cancle
          </Button>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                save();
              }}
              disabled={relationStatus == RELSTIONSHIP.relation}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Familymembers({ setTogglefamilyMember, type }) {
  const dispatch = useDispatch();
  const FAMILYMEMBER = useSelector((state) => state.user.familyMember);
  const [member, setMamber] = useState("");
  const [relation, setRelation] = useState("");
  const INDEXNO = useSelector((state) => state.about.indexNo);
  const SELECTEDITEM = useSelector((state) => state.about.deleteItem);
  const [update, setUpdate] = useState(false);
  var familyMemberObj = {};
  useEffect(() => {
    if (SELECTEDITEM == "familyMember") {
      familyMemberObj = FAMILYMEMBER[INDEXNO];
      setMamber(familyMemberObj.member);
      setRelation(familyMemberObj.relation);
      setUpdate(true);
    }
  }, []);

  async function save() {
    const obj = {
      member,
      relation,
    };

    var newdata = [];
    if (update) {
      FAMILYMEMBER.forEach((e, i) => {
        if (i == INDEXNO) {
          newdata.push(obj);
        } else {
          newdata.push(e);
        }
      });
    } else {
      newdata = [...FAMILYMEMBER, obj];
    }

    console.log(newdata);

    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/about_info_workPlace",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: { newData: newdata, type },
      });
      const data = response.data;
      if (data == "updated") {
        dispatch(familyMember(newdata));
        setTogglefamilyMember(false);
      }
      dispatch(deleteItem(""));
      dispatch(indexNo(""));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Editordiv">
      <div id="PlaceLivedTop">
        <TextField
          label="family Member"
          value={member}
          onChange={(e) => setMamber(e.target.value)}
          name="numberformat"
          id="formatted-numberformat-input"
          variant="outlined"
        />
        <TextField
          label="Relation"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          name="numberformat"
          id="formatted-numberformat-input"
          variant="outlined"
        />
      </div>
      <Divider />
      <div id="PlaceLivedBottom">
        <Button variant="contained">
          <PublicIcon />
        </Button>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setTogglefamilyMember(false);
              dispatch(deleteItem(""));
              dispatch(indexNo(""));
            }}
          >
            Cancle
          </Button>
          <div>
            <Button
              disabled={member != "" && relation != "" ? false : true}
              variant="contained"
              onClick={() => save()}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShowList({ obj, itemType, indexNo, open }) {
  const [toggleDeleteEdit, setToggleDeleteEdit] = useState(false);
  const { USERID } = useParams();
  const { member, relation } = obj;

  return (
    <>
      <div className="list" style={{ margin: "5px 0 20px 0px" }}>
        <div className="listLeft">
          <FamilyRestroomIcon />
          <div>
            <p className="pHeading">{member}</p>
            <p className="subStaticP">
              <b>{relation}</b>
            </p>
          </div>
        </div>

        <div className="listRight">
          {USER.id == USERID ? (
            <>
              <PublicIcon />
              <IconButton
                onClick={() => setToggleDeleteEdit(!toggleDeleteEdit)}
              >
                <MoreHorizIcon />
              </IconButton>
              {toggleDeleteEdit
                ? DeleteEditPopup(open, itemType, indexNo)
                : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export function AddWorkPlace({ setTogglseWorkPlace, type }) {
  const dispatch = useDispatch();
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const WORKPLACELISTARR = useSelector((state) => state.user.workPlace);
  const INDEXNO = useSelector((state) => state.about.indexNo);
  const SELECTEDITEM = useSelector((state) => state.about.deleteItem);
  const [currentlyWorking, toggleCurrentlyWorking] = useState(false);
  const [to, setTo] = useState(new Date());
  const [from, setFrom] = useState(new Date());
  const [helperText, setHelperText] = useState("");
  const [update, setUpdate] = useState(false);
  var workPlaceObj = {};

  useEffect(() => {
    if (SELECTEDITEM == "workPlace") {
      setUpdate(true);
      workPlaceObj = WORKPLACELISTARR[INDEXNO];
    }
  });

  useEffect(() => {
    if (Object.keys(workPlaceObj).length != 0 && workPlaceObj.to == "present") {
      toggleCurrentlyWorking(true);
      setCompany(workPlaceObj.company);
      setPosition(workPlaceObj.position);
      setFrom(new Date(workPlaceObj.from));
    } else if (Object.keys(workPlaceObj).length != 0) {
      toggleCurrentlyWorking(true);
      setCompany(workPlaceObj.company);
      setPosition(workPlaceObj.position);
      setFrom(new Date(workPlaceObj.from));
      setTo(new Date(workPlaceObj.to));
    }
  }, []);

  var newWorkplace = [];

  async function save() {
    var From = from;
    var To;
    if (!currentlyWorking && to <= from) {
      console.log("error");
      return setHelperText("invalid Date");
    } else if (!currentlyWorking && to > from) {
      To = to;
      const single = {
        company,
        position,
        to: String(To),
        from: String(From),
        type: "public",
        showIntro: false,
      };
      if (!update) {
        newWorkplace.push(...WORKPLACELISTARR, single);
        insert(newWorkplace);
      } else {
        WORKPLACELISTARR.forEach((e, i) => {
          if (i == INDEXNO) {
            newWorkplace.push(single);
          } else {
            newWorkplace.push(e);
          }
        });
        insert(newWorkplace);
      }
    } else {
      To = "present";
      const single = {
        company,
        position,
        to: To,
        from: String(From),
        type: "public",
        showIntro: false,
      };
      if (!update) {
        newWorkplace.push(...WORKPLACELISTARR, single);
        insert(newWorkplace);
      } else {
        WORKPLACELISTARR.forEach((e, i) => {
          if (i == INDEXNO) {
            newWorkplace.push(single);
          } else {
            newWorkplace.push(e);
          }
        });
        insert(newWorkplace);
      }
    }
  }
  async function insert(newData) {
    console.log(type);
    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/about_info_workPlace",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: { newData, type },
      });
      const data = response.data;
      if (data == "updated") {
        setTogglseWorkPlace(false);
        dispatch(workPlace(newData));
      }
      dispatch(deleteItem(""));
      dispatch(indexNo(""));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Editordiv">
      <div id="PlaceLivedTop">
        <TextField
          label="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          name="numberformat"
          id="formatted-numberformat-input"
          variant="outlined"
        />
        <TextField
          id="formatted-numberformat-input"
          value={position}
          label="positiion"
          variant="outlined"
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <div className="timePeriod">
        <p>Time Period</p>
        <FormControlLabel
          control={<Checkbox checked={currentlyWorking} />}
          label="I currently work here"
          onChange={() => toggleCurrentlyWorking(!currentlyWorking)}
        />

        {currentlyWorking ? (
          <div className="from">
            <p>from</p>
            <DatePicker onChange={setFrom} value={from} />
          </div>
        ) : (
          <div className="to">
            <DatePicker onChange={setFrom} value={from} />
            <p> to</p>
            <DatePicker onChange={setTo} value={to} />
          </div>
        )}
      </div>
      <FormHelperText sx={{ color: "red" }}>{helperText}</FormHelperText>
      <Divider />
      <div id="PlaceLivedBottom">
        <Button variant="contained">
          <PublicIcon />
        </Button>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setTogglseWorkPlace(false);
              dispatch(deleteItem(""));
              dispatch(indexNo(""));
            }}
          >
            Cancle
          </Button>
          <div>
            <Button
              disabled={company != "" && position != "" ? false : true}
              variant="contained"
              onClick={() => save()}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddStudiedAt({ close, type }) {
  const dispatch = useDispatch();
  const [school_college_name, setSchoole_college_name] = useState("");
  const [Description, setDescription] = useState("");
  const [pursuing, togglepursuing] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [to, setTo] = useState(new Date());
  const [from, setFrom] = useState(new Date());
  const SELECTEDITEM = useSelector((state) => state.about.deleteItem);
  const INDEXNO = useSelector((state) => state.about.indexNo);
  const COLLEGELISTARR = useSelector((state) => state.user.college);
  const SCHOOLLISTARR = useSelector((state) => state.user.school);
  const [update, setUpdate] = useState(false);

  var School_collegeObj = {};
  useEffect(() => {
    if (SELECTEDITEM == "college") {
      setUpdate(true);
      School_collegeObj = COLLEGELISTARR[INDEXNO];
    }
    if (SELECTEDITEM == "school") {
      setUpdate(true);
      School_collegeObj = SCHOOLLISTARR[INDEXNO];
    }
  });

  useEffect(() => {
    if (
      Object.keys(School_collegeObj).length != 0 &&
      School_collegeObj.to == "present"
    ) {
      togglepursuing(true);
      setSchoole_college_name(School_collegeObj.school_college_name);
      setDescription(School_collegeObj.Description);
      setFrom(new Date(School_collegeObj.from));
    } else if (Object.keys(School_collegeObj).length != 0) {
      togglepursuing(true);
      setSchoole_college_name(School_collegeObj.school_college_name);
      setDescription(School_collegeObj.Description);
      setFrom(new Date(School_collegeObj.from));
      setTo(new Date(School_collegeObj.to));
    }
  }, []);

  var new_school_college = [];
  function save() {
    var From = from;
    var To;
    if (!pursuing && to <= from) {
      console.log("error");
      return setHelperText("invalid Date");
    } else if (!pursuing && to > from) {
      To = to;
      const single = {
        school_college_name,
        Description,
        to: String(To),
        from: String(From),
        type: "public",
        showIntro: false,
      };
      if (!update) {
        if (type == "college") {
          new_school_college.push(...COLLEGELISTARR, single);
          insert(new_school_college);
        } else if (type == "school") {
          new_school_college.push(...SCHOOLLISTARR, single);
          insert(new_school_college);
        }
      } else if (update) {
        if (type == "college") {
          COLLEGELISTARR.forEach((e, i) => {
            if (i == INDEXNO) {
              new_school_college.push(single);
            } else {
              new_school_college.push(e);
            }
          });
          insert(new_school_college);
        } else if (type == "school") {
          SCHOOLLISTARR.forEach((e, i) => {
            if (i == INDEXNO) {
              new_school_college.push(single);
            } else {
              new_school_college.push(e);
            }
          });
          insert(new_school_college);
        }
      }
    } else {
      To = "present";
      const single = {
        school_college_name,
        Description,
        to: String(To),
        from: String(From),
        type: "public",
        showIntro: false,
      };
      if (!update) {
        if (type == "college") {
          new_school_college.push(...COLLEGELISTARR, single);
          insert(new_school_college);
        } else if (type == "school") {
          new_school_college.push(...SCHOOLLISTARR, single);
          insert(new_school_college);
        }
      } else if (update) {
        if (type == "college") {
          COLLEGELISTARR.forEach((e, i) => {
            if (i == INDEXNO) {
              new_school_college.push(single);
            } else {
              new_school_college.push(e);
            }
          });
          insert(new_school_college);
        } else if (type == "school") {
          SCHOOLLISTARR.forEach((e, i) => {
            if (i == INDEXNO) {
              new_school_college.push(single);
            } else {
              new_school_college.push(e);
            }
          });
          insert(new_school_college);
        }
      }
    }
  }

  async function insert(newData) {
    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/about_info_workPlace",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: { newData, type },
      });
      const data = response.data;
      if (data == "updated") {
        close(false);
        if (type == "college") {
          dispatch(college(newData));
        } else if (type == "school") {
          dispatch(school(newData));
        }
      }
      dispatch(deleteItem(""));
      dispatch(indexNo(""));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Editordiv">
      <div id="PlaceLivedTop">
        <TextField
          label={type}
          value={school_college_name}
          onChange={(e) => setSchoole_college_name(e.target.value)}
          name="numberformat"
          id="formatted-numberformat-input"
          variant="outlined"
        />
        <TextField
          label="Description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          name="numberformat"
          id="formatted-numberformat-input"
          variant="outlined"
        />
      </div>
      <div className="timePeriod">
        <p>Time Period</p>
        <FormControlLabel
          control={<Checkbox checked={pursuing} />}
          label="Pursuing"
          onChange={() => togglepursuing(!pursuing)}
        />

        {pursuing ? (
          <div className="from">
            <p>from</p>
            <DatePicker onChange={setFrom} value={from} />
          </div>
        ) : (
          <div className="to">
            <DatePicker onChange={setFrom} value={from} />
            <p> to</p>
            <DatePicker onChange={setTo} value={to} />
          </div>
        )}
      </div>
      <Divider />
      <FormHelperText sx={{ color: "red" }}>{helperText}</FormHelperText>
      <div id="PlaceLivedBottom">
        <Button variant="contained">
          <PublicIcon />
        </Button>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              close(false);
              dispatch(deleteItem(""));
              dispatch(indexNo(""));
            }}
          >
            Cancle
          </Button>
          <div>
            <Button
              disabled={
                school_college_name != "" && Description != "" ? false : true
              }
              variant="contained"
              onClick={() => save()}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShowCity({ obj, Citytype, open }) {
  const [toggleDeleteEdit, setToggleDeleteEdit] = useState(false);
  const { USERID } = useParams();
  const { city, type } = obj;

  return (
    <>
      <div className="list">
        <div className="listLeft">
          {Citytype == "homeTown" ? <HomeIcon /> : <LocationOnIcon />}
          <div>
            <p className="pHeading">{city}</p>
            <p className="subStaticP">{Citytype}</p>
          </div>
        </div>
        <div className="listRight">
          {USER.id == USERID ? (
            <>
              <PublicIcon />
              <IconButton
                onClick={() => setToggleDeleteEdit(!toggleDeleteEdit)}
              >
                <MoreHorizIcon />
              </IconButton>
              {toggleDeleteEdit ? DeleteEditPopup(open, Citytype) : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export function ShowRelation({ obj, open }) {
  const { USERID } = useParams();
  const { relation, showIntro } = obj;
  return (
    <>
      <div className="list">
        <div className="listLeft">
          <FavoriteIcon />
          <div>
            <p className="pHeading">{relation}</p>
          </div>
        </div>
        <div className="listRight">
          {USER.id == USERID ? (
            <>
              <IconButton onClick={() => open(true)}>
                <EditIcon />
              </IconButton>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}






function DeleteEditPopup(Toggle, type, indexNO = "") {
  const dispatch = useDispatch();
  function deletee() {
    dispatch(togglseConformDeletePopup(true));
    dispatch(deleteItem(type));
    if (indexNo) {
      dispatch(indexNo(indexNO));
    }
  }

  function edit() {
    Toggle(true);
    dispatch(deleteItem(type));
    if (indexNo) {
      dispatch(indexNo(indexNO));
    }
  }

  return (
    <div className="DeleteEditPopup">
      <Card>
        <CardContent>
          <div className="DeleteEditPopupBody">
            <div onClick={() => edit()}>
              <ModeEditOutlinedIcon />
              <p>edit {type}</p>
            </div>
            <div
              onClick={() => {
                deletee();
              }}
            >
              <DeleteOutlinedIcon />
              <p>Delete {type}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ShowWorkEduList({ obj, itemType, indexNo, open }) {
  var NAME;
  var FROM;
  var TO;
  var DES_POSI;
  var TYPE;

  if ((itemType = "workPlace")) {
    const { company, position, to, from, type } = obj;
    NAME = company;
    FROM = from;
    TO = to;
    DES_POSI = position;
    TYPE = type;
  }

  const [toggleDeleteEdit, setToggleDeleteEdit] = useState(false);
  const { USERID } = useParams();

  const fromDate = new Date(FROM).toLocaleDateString("en-us", {
    month: "long",
    year: "numeric",
  });

  var toDate;
  if (TO != "present") {
    toDate = new Date(TO).toLocaleDateString("en-us", {
      month: "long",
      year: "numeric",
    });
  } else toDate = TO;

  return (
    <>
      <div className="list" style={{ margin: "5px 0 20px 0px" }}>
        <div className="listLeft">
          <WorkIcon />
          <div>
            <p className="pHeading">
              {DES_POSI} at {NAME}
            </p>
            <p className="subStaticP">
              <b>from</b> {fromDate} <b>to</b> {toDate}
            </p>
          </div>
        </div>

        <div className="listRight">
          {USER.id == USERID ? (
            <>
              <PublicIcon />
              <IconButton
                onClick={() => setToggleDeleteEdit(!toggleDeleteEdit)}
              >
                <MoreHorizIcon />
              </IconButton>
              {toggleDeleteEdit
                ? DeleteEditPopup(open, itemType, indexNo)
                : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export function ShowCollegeSchoollist({ obj, itemType, indexNo, open }) {
  const { school_college_name, Description, to, from, type } = obj;

  console.log(school_college_name);

  const [toggleDeleteEdit, setToggleDeleteEdit] = useState(false);
  const { USERID } = useParams();

  const fromDate = new Date(from).toLocaleDateString("en-us", {
    month: "long",
    year: "numeric",
  });

  var toDate;
  if (to != "present") {
    toDate = new Date(to).toLocaleDateString("en-us", {
      month: "long",
      year: "numeric",
    });
  } else toDate = to;

  return (
    <>
      <div className="list" style={{ margin: "5px 0 20px 0px" }}>
        <div className="listLeft">
          <SchoolIcon />
          <div>
            {itemType == "college" ? (
              <p className="pHeading">Studied at {school_college_name}</p>
            ) : (
              <p className="pHeading">Went to {school_college_name}</p>
            )}
            <p className="subStaticP">
              <b> {Description}</b>
            </p>
            <p className="subStaticP">
              <b>from</b> {fromDate} <b>to</b> {toDate}
            </p>
          </div>
        </div>

        <div className="listRight">
          {USER.id == USERID ? (
            <>
              <PublicIcon />
              <IconButton
                onClick={() => setToggleDeleteEdit(!toggleDeleteEdit)}
              >
                <MoreHorizIcon />
              </IconButton>
              {toggleDeleteEdit
                ? DeleteEditPopup(open, itemType, indexNo)
                : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
