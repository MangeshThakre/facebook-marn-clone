import React from "react";
import "./friendSideBarMenu.css";
import { Card } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FriendHomePage } from "../../../../redux/freindSplice.js";
import FriendRequestSidebarMenu from "./FriendReauestSidebarmenu/friendRequestSidebarMenu";
import FriendsuggesstionSidebarMenu from "./friendSuggesstionSidebarMane/FriendsuggesstionSidebarMenu";
import AllFriendSideBarMenu from "./AllFriendsSideBarMenu/AllFriendSideBarMenu";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function FriendSideBarMenu({
  setFriendRequest,
  setFriendSuggesstion,
  friendRequest,
  friendSuggesstion,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backgroundColor_sub = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  const [allFriends, setAllFriends] = useState(false);
  const FREINDHOMEPAGE = useSelector((state) => state.friend.FriendHomePage);
  // dark mode
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);
  const BACKGROUNDCOLOR_SUB_FANT = useSelector(
    (state) => state.darkLight.backgroundColor_sub_fant
  );
  const ISDARK = useSelector((state) => state.darkLight.isDarkMode);
  //
  useEffect(() => {
    if (FREINDHOMEPAGE) navigate("/friends");
  }, [FREINDHOMEPAGE]);

  return (
    <div className="friendsSideMenu">
      <Card
        className=" friendsLeft"
        sx={{ backgroundColor: backgroundColor_sub }}
      >
        {FREINDHOMEPAGE ? (
          <>
            <div className="friendsLeftHead" style={{ color: FONTCOLOR }}>
              <h2>Friends</h2>
            </div>
            <div
              className="Friendshomeee"
              style={{
                backgroundColor: BACKGROUNDCOLOR_SUB_FANT,
                color: FONTCOLOR,
              }}
            >
              <div className="homeIcon">
                <PeopleAltIcon sx={{ color: "white" }} />
              </div>
              <p>home</p>
            </div>
            <div
              className={
                ISDARK == "on"
                  ? "friendsLefOptions" + ISDARK
                  : "friendsLefOptions"
              }
              style={{ color: FONTCOLOR }}
            >
              <div
                className="friends_friendRequest"
                onClick={() => {
                  dispatch(FriendHomePage(false));
                  setFriendRequest(true);
                }}
              >
                <div>
                  <div className="friends_friendRequestIcon">
                    <div></div>
                  </div>
                  <p>Friend Requests</p>
                </div>
                <ArrowForwardIosIcon />
              </div>

              <div
                className="friends_suggestion"
                onClick={() => {
                  dispatch(FriendHomePage(false));
                  setFriendSuggesstion(true);
                }}
              >
                <div>
                  <div className="friends_suggestionIcon">
                    <div></div>
                  </div>
                  <p>Suggestions</p>
                </div>
                <ArrowForwardIosIcon />
              </div>

              <div
                className="friends_AllFriends"
                onClick={() => {
                  dispatch(FriendHomePage(false));
                  setAllFriends(true);
                }}
              >
                <div>
                  <div className="friends_AllFriendsIcon">
                    <div></div>
                  </div>
                  <p>All friends</p>
                </div>

                <ArrowForwardIosIcon />
              </div>
            </div>
          </>
        ) : null}
        {friendRequest ? (
          <FriendRequestSidebarMenu setFriendRequest={setFriendRequest} />
        ) : null}
        {friendSuggesstion ? (
          <FriendsuggesstionSidebarMenu
            setFriendSuggesstion={setFriendSuggesstion}
          />
        ) : null}
        {allFriends ? (
          <AllFriendSideBarMenu setAllFriends={setAllFriends} />
        ) : null}
      </Card>
    </div>
  );
}

export default FriendSideBarMenu;
