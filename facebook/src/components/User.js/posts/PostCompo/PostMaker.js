import React from "react";
import AllPost from "../../../AllPostComponent/AllPost";

function PostMaker({ postDetail }) {
  const postDetails = postDetail;
  return (
    <>
      {postDetails?.length != 0 ? (
        <>
          {postDetails?.map((e, i) => {
            return (
              <div key={i}>
                <AllPost postData={e} />
              </div>
            );
          })}
        </>
      ) : (
        <div className="noPost" style={{ color: "gray" }}>
          <h3>No posts available</h3>
        </div>
      )}
    </>
  );
}

export default PostMaker;
