import mongoose from "mongoose"
import {} from "dotenv/config.js";
mongoose.connect(process.env.MONGODB_URL).then( console.log("successfuly connected to db")).catch((err)=>{console.log("err" , err)})
export default mongoose