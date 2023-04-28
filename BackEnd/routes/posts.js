const express = require('express');
const {getAllPosts,getPostById,addPost,updatePost,deletePost}= require('../controllers/posts')
const router = express.Router()

router.get('/',getAllPosts)
router.post('/create',addPost)
router.get('/:id',getPostById)
router.delete('/:id',deletePost)
router.put('/:id',updatePost)

module.exports= router;