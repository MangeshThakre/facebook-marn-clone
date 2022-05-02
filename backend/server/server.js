import 'dotenv/config'
import express from "express"
import cors from "cors"
import mongoose from "./database.js"
const app = express()
app.use(cors())
const port = process.env.PORT || 8081

app.get("/" , async (req,res)=>{
    res.send({data : "serving"})
})

app.listen(port, ()=>{
    console.log("server listning at http://localhost:8081")
})