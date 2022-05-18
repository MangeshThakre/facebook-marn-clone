import 'dotenv/config'
import express from "express"
import cors from "cors"
import mongoose from "./database.js"
import router from "./router/router.js";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filenamee = fileURLToPath(import.meta.url);
const __dirnamee = dirname(__filenamee);

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 8081;

app.use("/uploads", express.static(path.join(__dirnamee, "../uploads")));

app.use("/api", router);

app.listen(port, ()=>{
    console.log("server listning at http://localhost:8081")
})