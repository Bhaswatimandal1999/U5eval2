const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User",
        enum: ["User", "Moderator"]
    }
}, {
    versionKey: false
})


const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
}