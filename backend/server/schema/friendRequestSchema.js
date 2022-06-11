import mongoose from "mongoose";
const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
  user_id: { type: String },
  request_id: { type: String },
});

const frendRequestModel = mongoose.model("frendRequest", friendRequestSchema);
export default frendRequestModel;
