import React from "react";
import Card from "@mui/material/Card";
import contact from "../../../../image/contact.png";
import CardContent from "@mui/material/CardContent";
import { toggleCreatePost } from "../../../../redux/globleSplice.js";
import { useDispatch } from "react-redux";
function Create() {
  const dispatch = useDispatch();

  return (
    <div className="Create">
      <Card sx={{ height: "122.8px", borderRadius: "10px" }}>
        <CardContent>
          <div className="Create_upper" style={{ display: "flex" }}>
            <img src={contact} alt="" />

            <div
              className="input"
              onClick={() => {
                dispatch(toggleCreatePost(true));
              }}
              style={{ cursor: "pointer", backgroundColor: "#f0f2f5" }}
            >
              <p
                style={{
                  backgroundColor: "#f0f2f5",
                  width: "80%",
                  border: "none",
                  outline: "none",
                  fontSize: "1.063rem",
                }}
              >
                What's on your mind?
              </p>
            </div>
          </div>
          <div className="Create_bottom"></div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Create;
