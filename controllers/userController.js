"use strict"

const User = require("../models/user")
const passport = require("passport")
const {check, sanitizeBody, validationResult} = require("express-validator")
const getUserParamas = body => {
    return {
        loginId: body.loginId,
        viewName: body.viewName,
        password: body.password
    }
}

module.exports = {
    index: (req, res, next) => {
        User.find()
            .then(users => {
                res.locals.users = users
                next()
            })
            .catch(error => {
                console.log(`Error fetching users: ${error.message}`)
                next(error)
            })
    },
    indexView: (req, res) => {
        res.render("users/index")
    },

    new: (req, res) => {
        res.render("users/new")
    },

    create: (req, res, next) => {
        if (req.skip) return next()
        const newUser = new User(getUserParamas(req.body))
        console.log(getUserParamas(req.body))
        User.register(newUser, req.body.password, (error, user) => {
            console.log(user)


            if (user) {
                console.log("true")
                next()
            } else {
                res.render("users/new")
            }
        })
    },

    login: (req, res) => {
        res.render("users/login")

    },

    logout: (req, res, next) => {
        req.logout()
        req.flash("success", "You have been logged out")
        next()
    },

    //ログイン時の判定
    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        successRedirect: "/"
    }),


    validate: (req, res, next) => {

        sanitizeBody("loginId")
            .trim()
        check("password", "Password cannot be empty").notEmpty()
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.skip = true
            req.flash("error", messages.join(" and "))
            res.locals.redirect = "/users/new"
            next()
        } else {
            res.locals.redirect = "/"
            next()
        }
    },

    redirectView: (req, res, next) => {
        const redirectPath = res.locals.redirect
        if (redirectPath) res.redirect(redirectPath)
        else next()
    }

}