const Users = require("../users/users-model")
const Posts = require("../posts/posts-model")

function logger(req, res, next) {
    console.log(req.method, req.url, Date())
    next()
}

async function validateUserId(req, res, next) {
    const {id} = req.params
    const user = await Users.getById(id)
    if(!user){
        res.status(404).json({message:"user not found"})
    }else{next()}
}

function validateUser(req, res, next) {
    const user = req.body
    if(!user.name){
        res.status(400).json({ message: "missing required name field" })
    }else{
        next()
    }
}

function validatePost(req, res, next) {
    const post = req.body
    if(!post.text){
        res.status(400).json({ message: "missing required text field" })
    }else{
        next()
    }
}

module.exports = {logger,validateUserId,validateUser,validatePost}

// do not forget to expose these functions to other modules
