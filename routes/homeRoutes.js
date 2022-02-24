"use strict"

//

const router = require("express").Router()
const homeController = require("../controllers/homeController")

//ホームコントローラーのnewThreadを呼んでいる
router.get("/:category/new", homeController.newThread)
//ホームコントローラーのcategoryを呼んでいる
router.get("/:category", homeController.category)
//ホームコントローラーのindexを呼んでいる
router.get("/", homeController.index)

module.exports = router