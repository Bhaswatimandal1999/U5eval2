const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
// const { blogRouter } = require("./routes/blog.routes")
const { auth } = require("./middleware/auth.middleware")
const { authorize } = require("./middleware/authorize.middleware")
const jwt = require("jsonwebtoken")
const { UserModel } = require("./model/user.model")
require("dotenv").config()


const app = express()
app.use(express.json())
app.use("/users", userRouter)
// app.use("/blog", blogRouter)




app.listen(process.env.port, async () => {
    try {
        console.log(`server running at ${process.env.port}`)
        await connection
        console.log("connected to db");
    } catch (err) {
        console.log("something went wrong")
        console.log(err)

    }
})