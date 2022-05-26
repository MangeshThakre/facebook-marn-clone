import Divider from "@mui/material/Divider";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import PublicIcon from "@mui/icons-material/Public";
import "./aboutOptions.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { currentCity, homeTown } from "../../../../redux/userSplice";
import Input from "@mui/material/Input";
const URL = process.env.REACT_APP_API_URL;
const TOKEN = localStorage.getItem("TOKEN");

export function PlaceLived({ close, type }) {
  const dispatch = useDispatch();
  const CURRENTCITY = useSelector((state) => state.user.currentCity);
  const HOMETOWN = useSelector((state) => state.user.currentCity);
  var [place, setPlace] = useState("");

  useEffect(() => {
    if (Object.keys(CURRENTCITY).length != 0) {
      const { city, type } = CURRENTCITY;
      setPlace(city);
    }
    if (Object.keys(HOMETOWN).length != 0) {
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
        <Button variant="contained">public</Button>
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

export function AddCurrentCity({ obj, Citytype, open }) {
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
          <IconButton onClick={() => open(true)}>
            <MoreHorizIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
