const mongoose = require(`mongoose`)
const Thread = require("../models/thread")
const messageSchema = require("../models/messageSchema")

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

    thread: (req, res, next) => {
        const category = req.params.category
        const thread = req.params.thread
        console.log(category)
        const Message = mongoose.model(`${category}-${thread}`, messageSchema)
        Message.find({})
            .then(messages => {

                res.locals.messages = messages
                res.locals.category = category
                res.locals.thread = thread
                console.log(messages)
                res.render("thread")
            })
            .catch(error=> {
                res.render("index")
            })
    },

    createMessage: (req, res, next) => {
        const category = req.params.category
        const thread = req.params.thread
        const Message = mongoose.model(`${category}-${thread}`, messageSchema)
        const params = {
            //スレッド作成をした時に、一緒にタグ付けられる
            message: req.body.message,
            user: req.body.user
        }
        Message.create(params)
            .then( () => {
                console.log("successfully create new thread")
                res.locals.redirect = `/${category}/${thread}`
                next()
            })
    },

    newMessage: (req, res, next) => {
    res.locals.category = req.params.category
    res.locals.thread = req.params.thread
    res.render("newMessage")
    },

    redirectView: (req, res, next) => {
        const redirectPath = res.locals.redirect
        if(redirectPath !== undefined) res.redirect(redirectPath)
        else next()
    }
}