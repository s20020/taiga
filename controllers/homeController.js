const mongoose = require(`mongoose`)

module.exports = {
    index: (req, res) => {
        res.render("index")
    },

    category: (req, res) => {
        const category = req.params.category
        res.locals.category = category
        //render がejsを返している
        res.render("category")
    }
}