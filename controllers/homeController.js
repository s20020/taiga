const mongoose = require(`mongoose`)
const Thread = require("../models/thread")

//一つひとつが関数
module.exports = {
    index: (req, res) => {
        res.render("index")
    },

    category: (req, res) => {
        const category = req.params.category
        res.locals.category = category

        //スレッドはデータベースにつながっている
        //findはデータを見つける
        Thread.find({category: category})
            .then(threads => {
                res.locals.threads = threads
                //render がejsを返している
                res.render("category")
            })

    },

    newThread: (req, res) => {
        res.locals.category = req.params.category
        res.render("newThread")
    },

    createThread: (req, res, next) => {
        const params = {
            //スレッド作成をした時に、一緒にタグ付けられる
            title: req.body.title,
            category: req.body.category
        }
        Thread.create(params)
            .then( () => {
                console.log("successfully create new thread")
                res.locals.redirect = `/${req.params.category}`
                next()
            })
    },

    redirectView: (req, res, next) => {
        const redirectPath = res.locals.redirect
        if(redirectPath !== undefined) res.redirect(redirectPath)
        else next()
    }
}