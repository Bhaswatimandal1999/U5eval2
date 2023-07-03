const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { auth } = require("../middleware/auth.middleware")
const { authorize } = require("../middleware/authorize.middleware")
const { BlogModel } = require("../model/blog.model")

const blogRouter = express.Router()

blogRouter.post("/add", async (req, res) => {
    try {
        const payload = req.body;
        const blog = await BlogModel(payload)
        await blog.save()
        res.status(200).json({ msg: "new blog is added" })
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})

blogRouter.get("/read/:id", auth, async (req, res) => {
    const { id } = req.params.id
    try {
        const blog = await blog.findOne({ _id: id }, req.body)
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(400).json({ msg: "not found" })
        }
    } catch (err) {
        res.status(400).json({ err: err.message })

    }
})

blogRouter.patch("/update/:id", auth, authorize(["User"]), async (req, res) => {
    const { id } = req.params.id
    const userid = req.body.userID
    try {
        const user = await BlogModel.findOne({ _id: id })
        const userID = req.user.userID
        const blog = await blog.findById(req.paramsms.id)
        if (!blog) {
            res.send(400).json({ msg: "blog not found" })
        }
        if (blog.userID !== userID) {
            res.send(400).json({ msg: "unauthorized" })
        } blog.title = title;
        blog.content = content;
        await blog.save()
        res.send(200).json({ msg: "blog updated successfully" })

    } catch (err) {
        res.status(400).json({ err: "error updating blog" })
    }
})

// blogRouter.delete("/read/:id", auth, authorize(["Moderator"]), async (req, res) => {

// })


module.exports = {
    blogRouter
}