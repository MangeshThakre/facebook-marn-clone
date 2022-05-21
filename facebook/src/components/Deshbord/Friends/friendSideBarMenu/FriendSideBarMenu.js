import React from "react";
import "./friendSideBarMenu.css";
import { Card } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
function FriendSideBarMenu() {
  const backgroundColor_sub = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  return (
    <div className="friendsSideMenu">
      <Card
        className=" friendsLeft"
        sx={{ backgroundColor: backgroundColor_sub }}
      >
        <div className="friendsLeftHead">
          <h2>Friends</h2>
        </div>
        <div className="Friendshomeee">
          <div className="homeIcon">
            <PeopleAltIcon sx={{ color: "white" }} />
          </div>
          <p>home</p>
        </div>
        <div className="friendsLefOptions">
          <div className="friends_friendRequest">
            <div>
              <div className="friends_friendRequestIcon">
                <div></div>
              </div>
              <p>Friend Request</p>
            </div>
            <ArrowForwardIosIcon />
          </div>

          <div className="friends_suggestion">
            <div>
              <div className="friends_suggestionIcon">
                <div></div>
              </div>
              <p>Freind suggestion</p>
            </div>
            <ArrowForwardIosIcon />
          </div>

          <div classname="friends_AllFriends">
            <div>
              <div className="friends_AllFriendsIcon">
                <div></div>
              </div>
              <p>All friend</p>
            </div>

            <ArrowForwardIosIcon />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default FriendSideBarMenu;
