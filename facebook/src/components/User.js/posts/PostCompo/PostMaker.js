import React from "react";
import AllPost from "../../../AllPostComponent/AllPost";

function PostMaker({ postDetail }) {
  const postDetails = postDetail;
  return (
    <>
      {postDetails?.length != 0 ? (
        postDetails?.map((e) => {
          return (
            <div key={e?._id}>
              <AllPost text={e.text} photo={e.photo} bg={e.Bg} postData={e} />
            </div>
          );
        })
      ) : (
        <div className="noPost" style={{ color: "gray" }}>
          <h3>No posts available</h3>
        </div>
      )}
    </>
  );
}

export default PostMaker;
