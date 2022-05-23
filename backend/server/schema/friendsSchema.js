import mongoose from "mongoose";
const Schema = mongoose.Schema;

const friendsSchema = new Schema({
  user_id: { type: String },
  friend_id: { type: String },
});

const friendsModel = mongoose.model("friends", friendsSchema);
export default friendsModel;
