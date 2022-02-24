"use strict"



const express = require("express")
const app = express()
const router = require(".router/index")
const layouts = require("express-ejs-layouts")
const mongoose = require("mongoose")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://0.0.0.0:27017/taiga")
    .then( () => {console.log("successfully! connect mongoose")})
    .catch(error => { throw error})