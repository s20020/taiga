"use strict"



const express = require("express")
const app = express()
//ルーター
const router = require("./routes/index")
const layouts = require("express-ejs-layouts")
const mongoose = require("mongoose")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://0.0.0.0:27017/taiga")
    .then( () => {console.log("successfully! connect mongoose")})
    .catch(error => { throw error})

app.set("port", process.env.PORT || 3000 )
app.set("view engine", "ejs")
app.set("token", process.env.TOKEN || "taigatoken")

app.use(express.static("public"))
app.use(layouts)
app.use(
    express.urlencoded( {
        extended: false
    })
)


app.use("/", router)

const server = app.listen(app.get("port"), () => {
    console.log(`Start http://localhost:${app.get("port")}`)
})