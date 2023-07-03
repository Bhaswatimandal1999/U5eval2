const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.model")

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (token) {
        try {
            const decoded = jwt.verify(token, "masai")
            const { userID } = decoded
            const user = await UserModel.findOne({ _id: userID })
            const role = user?.role
            req.role = role
            next()
        } catch (err) {
            res.status(400).json({ err: err.message })

        }
    } else {
        res.status(400).json({ msg: "please login" })

    }

    module.exports = {
        auth
    }
}