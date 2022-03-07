"use strict"

const router = require("express").Router()
const userController = require("../controllers/userController")

router.get("/", userController.index, userController.indexView)

router.get("/new", userController.new)
router.post(
    "/create",
    userController.validate,
    userController.create,
    userController.redirectView
)

router.get("/login", userController.login)
router.post(
    "/login",
    userController.authenticate
   /* userController.redirectView */
)

router.get("/logout", userController.logout, userController.redirectView)

module.exports = router