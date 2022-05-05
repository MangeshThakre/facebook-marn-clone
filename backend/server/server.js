import 'dotenv/config'
import express from "express"
import cors from "cors"
import mongoose from "./database.js"
import router from "./router/router.js";
import bodyParser from "body-parser";
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 8081;

app.use("/api", router);

app.listen(port, ()=>{
    console.log("server listning at http://localhost:8081")
})