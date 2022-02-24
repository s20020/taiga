const mongoose = require(`mongoose`)
const Thread = require("../modules/thread")

//一つひとつが関数
module.exports = {
    index: (req, res) => {
        res.render("index")
    },

    category: (req, res) => {
        const category = req.params.category
        res.locals.category = category
        //render がejsを返している
        res.render("category")
    },

    newThread: (req, res) => {
        res.locals.category = req.params.category
        res.render("newThread")
    },

    createThread: (req, res, next) => {
        const params = {
            title: req.body.title
        }
        Thread.create(params)
            .then( () => {
                console.log("successfully create new thread")
                res.locals.redirect = `${req.paramas.category()}`
                next()
            })
    }
}