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
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
function AboutPopUp() {
  const dispatch = useDispatch();
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
              <p>Details you select will be public.</p>
              <div>
                <p>Work</p>
                <div>
                  <AddCircleOutlineIcon
                    sx={{ color: "#1976d2 ", height: "32px", width: "32px" }}
                  />
                  <p>add a Work Place</p>
                </div>
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
              <div className="AboutSwitch">
                <p>Current City</p>
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
              <div>
                <p>Hometown</p>
                <div>
                  <AddCircleOutlineIcon
                    sx={{ color: "#1976d2 ", height: "32px", width: "32px" }}
                  />
                  <p>Add hometown</p>
                </div>
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
                    label="Single"
                  />
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </CardContent>
          <Divider />
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
