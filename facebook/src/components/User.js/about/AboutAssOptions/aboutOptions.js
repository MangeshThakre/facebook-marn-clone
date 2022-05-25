import Divider from "@mui/material/Divider";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./aboutOptions.css";
import { useState, useEffect } from "react";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;
const TOKEN = localStorage.getItem("TOKEN");

export function PlaceLived({ close, type }) {
  const [place, setPlace] = useState("");
  async function save() {
    try {
      const response = await axios({
        method: "get",
        url: URL + `/api/about_info_?${type}=` + place,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
    } catch (error) {
      console.log("Error PlaceLived :", error);
    }
  }

  return (
    <>
      <div id="PlaceLivedTop">
        <TextField
          id="outlined-basic"
          defaultValue={place}
          label={type}
          onChange={(e) => setPlace(e.target.value)}
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
    </>
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
