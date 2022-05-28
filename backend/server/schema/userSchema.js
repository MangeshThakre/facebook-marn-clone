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
  currentCity: { type: Object },
  homeTown: { type: Object },
  workPlace: { type: Array },
  college: { type: Array },
  school: { type: Array },
  familyMember: { type: Array },
  created_at: { type: Date },
});

const userModel = mongoose.model("userSchema", userSchema);
export default userModel;
