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
import { useParams } from "react-router-dom";
import {
  togglseConformDeletePopup,
  deleteItem,
} from "../../../../redux/aboutPAgeSplice.js";
import { Card, CardContent } from "@mui/material";
import { useState, useEffect } from "react";
import { currentCity, homeTown } from "../../../../redux/userSplice";
import { useSelector, useDispatch } from "react-redux";
import "./aboutOptions.css";
const URL = process.env.REACT_APP_API_URL;
const TOKEN = localStorage.getItem("TOKEN");

export function PlaceLived({ close, type }) {
  const dispatch = useDispatch();
  const CURRENTCITY = useSelector((state) => state.user.currentCity);
  const HOMETOWN = useSelector((state) => state.user.homeTown);
  var [place, setPlace] = useState("");

  console.log(type);

  useEffect(() => {
    if (Object.keys(CURRENTCITY).length != 0 && type == "CurrentCity") {
      const { city, type } = CURRENTCITY;
      setPlace(city);
    }
    if ((Object.keys(HOMETOWN).length != 0) & (type == "homeTown")) {
      const { city, type } = HOMETOWN;
      setPlace(city);
    }
  }, []);

  async function save() {
    try {
      console.log(place);
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

export function Familymembers({ setTogglefamilyMember }) {
  return (
    <>
      <div id="PlaceLivedTop">
        <TextField
          id="outlined-basic"
          label="Family members"
          variant="outlined"
        />
      </div>
      <Divider />
      <div id="PlaceLivedBottom">
        <Button variant="contained">public</Button>
        <div>
          <Button
            variant="contained"
            onClick={() => setTogglefamilyMember(false)}
          >
            Cancle
          </Button>
          <div>
            <Button variant="contained">Save</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export function AddWorkPlace({ setTogglseWorkPlace }) {
  return (
    <>
      <div id="PlaceLivedTop">
        <TextField id="outlined-basic" label="company" variant="outlined" />{" "}
        <TextField id="outlined-basic" label="Position" variant="outlined" />{" "}
        <TextField id="Description" label="Description" variant="outlined" />
      </div>
      <Divider />
      <div id="PlaceLivedBottom">
        <Button variant="contained">public</Button>
        <div>
          <Button
            variant="contained"
            onClick={() => setTogglseWorkPlace(false)}
          >
            Cancle
          </Button>
          <div>
            <Button variant="contained">Save</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export function AddStudiedAt({ close }) {
  return (
    <>
      <div id="PlaceLivedTop">
        <TextField id="outlined-basic" label="School" variant="outlined" />{" "}
        <TextField id="Description" label="Description" variant="outlined" />
      </div>
      <Divider />
      <div id="PlaceLivedBottom">
        <Button variant="contained">public</Button>
        <div>
          <Button variant="contained" onClick={() => close(false)}>
            Cancle
          </Button>
          <div>
            <Button variant="contained">Save</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export function ShowCity({ obj, Citytype, open }) {
  const [toggleDeleteEdit, setToggleDeleteEdit] = useState(false);
  const { city, type } = obj;
  return (
    <>
      <div className="list">
        <div className="listLeft">
          <p className="pHeading">{city}</p>
          <p className="subStaticP">{Citytype}</p>
        </div>
        <div className="listRight">
          <PublicIcon />
          <IconButton onClick={() => setToggleDeleteEdit(!toggleDeleteEdit)}>
            <MoreHorizIcon />
          </IconButton>
          {toggleDeleteEdit ? DeleteEditPopup(open, Citytype) : null}
        </div>
      </div>
    </>
  );
}

function DeleteEditPopup(Toggle, type) {
  const { USERID } = useParams();
  const dispatch = useDispatch();
  console.log(type);
  return (
    <div className="DeleteEditPopup">
      <Card>
        <CardContent>
          <div className="DeleteEditPopupBody">
            <div onClick={() => Toggle(true)}>
              <ModeEditOutlinedIcon />
              <p>edit {type}</p>
            </div>
            <div
              onClick={() => {
                dispatch(togglseConformDeletePopup(true));
                dispatch(deleteItem(type));
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


 
