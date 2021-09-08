const express = require('express');
const router = express.Router();

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const { validatePost, validateUser, validateUserId, logger } = require('../middleware/middleware');
const Users = require("./users-model")
const Posts = require("../posts/posts-model")

router.get('/', logger, (req, res) => {
    Users.get()
        .then(users =>{
            res.status(200).json(users)
        })
        .catch(err =>{
            res.status(500).json({message:err})
        })
});

router.get('/:id',logger, validateUserId,(req, res) => {
    const {id} = req.params
    Users.getById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err =>{
            res.status(500).json({message:err})
        })
    
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/',logger, validateUser,(req, res) => {
    const newUser = req.body
    Users.insert(newUser)
        .then(user =>{
            res.status(201).json(user)
        })
        .catch(err =>{
            res.status(500).json({message:err})
        })

  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id',logger, validateUserId, validateUser, (req, res) => {
    const {id} = req.params
    const editedUser = req.body
    Users.update(id, editedUser)
        .then(user =>{
            res.status(200).json(user)
        })
        .catch(err =>{
            res.status(500).json({message:err})
        })
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id',logger, validateUserId, async (req, res) => {
    try{
        const {id} = req.params
        const user = await Users.getById(id) 
        await Users.remove(id)
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({message:err})
    }
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

});

router.get('/:id/posts', logger,validateUserId,(req, res) => {
    const {id} = req.params
    Users.getUserPosts(id)
        .then(posts =>{
            res.status(200).json(posts)
        })
        .catch(err=>{
            res.status(500).json({message:err})
        })
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts',logger, validateUserId,validatePost,(req, res) => {
    const {id} = req.params
    const post = {...req.body, user_id:id}
    Posts.insert(post)
        .then(post =>{
            res.status(200).json(post)
        })
        .catch(err =>{
            res.status(500).json({message:err})
        })

  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

});


module.exports = router
// do not forget to export the router
