import React from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useRef, useState, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./freindUser.css";
import { useSelector } from "react-redux";
import FreindUserBox from "./freindUserBox";
import Divider from "@mui/material/Divider";
import useFecthFreindCustomHook from "./FecthFreindCustomHook";
import FriendUserBoxSkeleton from "./friendUserBoxSkeleton.js"
function Friends() {

  const observer = useRef();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);
  const ICONCOLOR = useSelector((state) => state.darkLight.iconColor);
  const BACKGROUNDCOLOR_SUB_FANT = useSelector(
    (state) => state.darkLight.backgroundColor_sub_fant
  );
  const { freindsData, hasMore , loading } = useFecthFreindCustomHook(query, page);

  const lastFriendRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (hasMore) {
            setPage( prevPage =>prevPage +1 )
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const updatedText = debounce((text) => {
    setQuery(text);
    setPage(1);
  });

  function debounce(cb, delay = 1000) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  return (
    <div style={{ width: "1186px", marginBottom: "20px" }}>
      <Card sx={{ borderRadius: "7px", backgroundColor: SUB_BACKGROUND_COLOR }}>
        <CardContent>
          <div>
            <div className="userFreindHeader">
              <h3 style={{ color: FONTCOLOR }}>Friends</h3>

              <div>

              <div
                className="search"
                id="search"
                style={{ backgroundColor: BACKGROUNDCOLOR_SUB_FANT  }}
                >
                <SearchIcon sx={{ marginLeft: "5px", color: ICONCOLOR }} />
                <input
                  type="text"
                  placeholder="Search Facebook"
                  onChange={(e) => {
                    updatedText(e.target.value);
                  }}
                  style={{
                    color: ICONCOLOR,
                    backgroundColor: BACKGROUNDCOLOR_SUB_FANT,
                  }}
                  />
              </div>
                  </div>
            </div>

            <Divider variant="middle" />



            <div className="userFreindBody">
              {freindsData.length != 0 ? (
                <> {


                  freindsData.map((e, i) => {
                    if (freindsData.length === i + 1) {
                      return (
                        <div ref={lastFriendRef} key={i}>
                        <FreindUserBox e={e} />
                      </div>
                    );
                  } else return <FreindUserBox key={i} e={e} />;
                })
              } 
              </>

         ) : null}
        { loading   || hasMore   ?   <FriendUserBoxSkeleton color ={ SUB_BACKGROUND_COLOR}/> : null}
          {!loading  && freindsData.length ==0 ? (
             <div  className ="noResult">
               <h3 style ={{  color :ICONCOLOR}} > No results for: {query}</h3>
                </div>
              ): null }

            </div>
          </div>
      </CardContent>
      </Card>
    </div>
  );
}

export default Friends;




 


  // async function fetchFrinds(text = "") {
  //   console.log(text);
  //   setIsFreindLoading(true);
  //   try {
  //     const response = await axios({
  //       method: "get",
  //       url:
  //         URL +
  //         "/api/get_friends?user_id=" +
  //         USERID +
  //         "&page=" +
  //         page +
  //         "&limit=3&match=" +
  //         text,
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${TOKEN}`,
  //       },
  //     });
  //     const data = await response.data;
  //     if (response.data.next) {
  //       setNextPage(true);
  //       setPage(response.data.next.page);
  //     } else setNextPage(false);
  //     setFriendsData([...freindsData, ...data.data]);
  //     setIsFreindLoading(false);
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // }