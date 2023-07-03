const express = require("express")
const { UserModel } = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { authorize } = require("../middleware/authorize.middleware")
const { blacklist } = require("../blacklist")

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, pass, role } = req.body
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.status(400).json({ err: err.message })
            } else {
                const user = new UserModel({ name, email, pass: hash, role })
                await user.save()
                res.status(200).json({ msg: "A new user has been added", user: user })

            }
        })
    } catch (err) {
        res.status(400).json({ err: err.message })

    }
})


userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    var token = jwt.sign({ userID: user._id }, "masai", { expiresIn: "60s" })
                    var rToken = jwt.sign({ userID: user._id }, "school", { expiresIn: "180s" })
                    res.status(200).json({ msg: "Login Successfull!!!", token, rToken })

                } else {
                    res.status(200).json({ msg: "Wrong creadentials" })

                }
            })
        } else {
            res.status(200).json({ msg: "User Not Found" })
        }
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})


userRouter.get("/logout", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]
    try {
        // blacklist.push(token)
        if (token) {
            const blacklistedToken = new BlacklistedToken({ token })
            await blacklistedToken.save()
            res.status(200).json({ msg: "The user has been logged out" })
        }
    } catch (err) {
        res.status(400).json({ err: err.message })

    }
})

module.exports = {
    userRouter
}