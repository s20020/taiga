"use strict"

const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const {category} = require("../controllers/homeController");

const threadSchema = new Schema(
    {
        title: {
            type: String,
            unique: true
        },
        category: {
            type: String
        }
    },

    { timestamps: true }
)

module.exports = mongoose.model("Thread", threadSchema)