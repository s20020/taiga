const mongoose = require(`mongoose`)

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
        res.local.category = req.paramas.category
        res.render("newThread")
    }
}