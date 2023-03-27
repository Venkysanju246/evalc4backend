const express = require("express")
const connectiontodb = require("./connection/db")
const auth = require("./middleware/auth.middleware")
const postsadd = require("./routes/posts.routes")
const userReg = require("./routes/user.route")
const app = express()
app.use(express.json())
require("dotenv").config()

app.use("/users", userReg)
app.use(auth)
app.use("/posts", postsadd)
app.listen(process.env.port, async (req, res)=>{
   await connectiontodb
   console.log("connected to db")
    console.log("server connected")
})