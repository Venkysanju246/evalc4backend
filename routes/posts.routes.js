const express = require("express")
const PostModel = require("../model/post.model")

const postsadd = express.Router()

postsadd.post("/add", async (req, res) => {
    const payload = req.body
    const newPost = PostModel(payload)
    await newPost.save()
    res.status(200).send({
        msg: "Post uploaded"
    })
})

postsadd.get("/", async (req, res) => {
    const min = req.query.min
    const max = req.query.max
    const postData = await PostModel.find({userId:req.body.userId})
    res.status(200).send(postData)
})
postsadd.get("/top", async (req, res) => {
    const data = await PostModel.find({userId:req.body.userId}).sort({ no_of_comments: -1 }).limit(3)
    res.send(data)
})
postsadd.get("/specific", async (req, res) => {
    const device = req.query
    const data = await PostModel.find(device)
    res.send(data)
})
postsadd.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const id = req.params.id
    const updata = await PostModel.find({_id:id})
    if(updata.length>=0){
        const updatedData = await PostModel.findByIdAndUpdate({ _id: id }, payload)
        res.status(200).send({
            msg: "Post updated suceesfully"
        })
    }else{
        res.send({
            msg: "Post does not exist"
        })
    }
  
})
postsadd.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const updata = await PostModel.find({_id:id})
    if(updata.length>0){
        const updatedData = await PostModel.findByIdAndDelete({ _id: id })
        res.status(200).send({
            msg: "Post Deleted succesfully"
        })
    }else{
        res.send({

        })
    }
})

module.exports = postsadd

//done be