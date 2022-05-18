import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user_id: { type: String },
  text: { type: String },
  bg: { type: String },
  photo: { type: String },
  like_dislike: { type: Array },
  posted_at: { type: Date },
});

const postModel = mongoose.model("postSchema", postSchema);
export default postModel;
