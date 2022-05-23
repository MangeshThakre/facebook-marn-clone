import React from "react";
import "../AboutPopUpcomponent/AboutPopUp.css";
import Card from "@mui/material/Card";
import { useDispatch } from "react-redux";
import { toggleAboutPopUp } from "../../../../redux/globleSplice.js";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { height } from "@mui/system";
function AboutPopUp() {
  const dispatch = useDispatch();
  return (
    <div className="aboutComponentBody" style={{ backgroundColor: "blue" }}>
      <div className="aboutpopupBox">
        <Card>
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
          <CardContent>
            <div className="AboutPopPuoBody">
              <h3> Customize your intro</h3>
              <p>Details you select will be public.</p>
              <div>
                <p>Work</p>
                <AddCircleOutlineIcon
                  sx={{ color: "#1976d2 ", height: "32px", width: "32px" }}
                />
                <p>add a Work Place</p>
              </div>
              <div>
                <p>Education</p>
                <div>
                  <AddCircleOutlineIcon
                    sx={{ color: "#1976d2 ", height: "32px", width: "32px" }}
                  />
                  <p>Add a high school</p>
                </div>
                <div>
                  <AddCircleOutlineIcon
                    sx={{ color: "#1976d2 ", height: "32px", width: "32px" }}
                  />
                  <p>Add a College</p>
                </div>
              </div>
              <div>
                <p>Current City</p>
                <div>
                  <AddCircleOutlineIcon
                    sx={{ color: "#1976d2 ", height: "32px", width: "32px" }}
                  />
                </div>
              </div>
              <div>
                <p>Hometown</p>
                <div>
                  <AddCircleOutlineIcon
                    sx={{ color: "#1976d2 ", height: "32px", width: "32px" }}
                  />
                  <p>Add hometown</p>
                </div>
              </div>
              <div>
                <p>Relationship</p>
                <div>
                  <AddCircleOutlineIcon
                    sx={{ color: "#1976d2 ", height: "32px", width: "32px" }}
                  />
                </div>
              </div>
              <div>
                <p>Joined Facebook</p>
                <div>
                  <AddCircleOutlineIcon
                    sx={{ color: "#1976d2 ", height: "32px", width: "32px" }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className="AboutPopPuoFooter">
              <div className="p">
                <p>Update Your Information</p>
              </div>
              <div>
                <div>
                  <Button variant="contained">Cancle</Button>
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

export default AboutPopUp;
