const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        unique: true,
        required: true
    }

}, {
    versionKey: false
})


const BlogModel = mongoose.model("blog", blogSchema)

module.exports = {
    BlogModel
}