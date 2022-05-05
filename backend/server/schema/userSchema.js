import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, require: true },
  firstName: { type: String },
  lastName: { type: String },
  phoneNo: { type: Number },
  profilePic: { type: String },
  password: { type: String, require: true },
  DOB: { type: Date },
});

const userModel = mongoose.model("userSchema", userSchema);
export default userModel;
