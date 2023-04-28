const db = require("../db")
const jwt = require('jsonwebtoken');

const JWT_SECRET = "kjkljkjsdfhsjfuhge";

const getAllPosts = (req, res) =>{
    const {category}=req.query
    const q = category?"SELECT * FROM posts WHERE `category` = ?":"SELECT * FROM posts"

    db.query(q,[category],(err,data)=>{
        if(err) return res.json(err)
      
        return res.status(200).json({success:true,posts:data})
    })
}
const getPostById = (req, res) =>{
    const {id}=req.params
    const q ="SELECT p.id,`userName`,`title`,`desc`,`img`,u.image as userImage,`date`,`category` FROM users as u JOIN posts as p ON u.id = p.userId WHERE p.id = ?"

    db.query(q,[id],(err,data)=>{
        if(err) return res.json(err)
        if(data.length === 0) return res.status(404).json({success:false,msg:"No Data Found!"})
        return res.status(200).json({success:true,post:data[0]})
    })
}
const addPost = (req, res) =>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json({success:false,msg:"User not authenticated."})

    jwt.verify(token,JWT_SECRET,(err,userInfo)=>{
        if(err) return res.status(403).json({success:false,msg:"User access token not valid."})
    const {title,desc,file,userId,category,date}=req.body;

    const q = "INSERT INTO posts (`title`,`desc`,`img`,`date`,`userId`,`category`) VALUES(?)"
const values =[
    title,desc,file,date,userId,category
]
db.query(q,[values],(err,data,)=>{
    if(err) return res.json(err)
  
    return res.status(200).json({success:true,msg:"Post has been created."})
})
})
}
const deletePost = (req, res) =>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json({success:false,msg:"User not authenticated."})

    jwt.verify(token,JWT_SECRET,(err,userInfo)=>{
        if(err) return res.status(403).json({success:false,msg:"User access token not valid."})
        const postId=req.params.id
        const q ="DELETE FROM posts  WHERE id = ? AND userID = ?"
    
        db.query(q,[postId,userInfo.id],(err,data)=>{
            if(err) return res.status(403).json({success:false,msg:"You can't delete this post."})
            return res.status(200).json({success:true,msg:"Post has been deleted."})
        })
    })
}
const updatePost = (req, res) =>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json({success:false,msg:"User not authenticated."})

    jwt.verify(token,JWT_SECRET,(err,userInfo)=>{
        if(err) return res.status(403).json({success:false,msg:"User access token not valid."})
    const {title,desc,file,category}=req.body;

    const q = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`category`=? WHERE `id` = ? AND `userId` = ?"
const values =[
    title,desc,file,category,req.params.id,userInfo.id
]
db.query(q,[...values],(err,data,)=>{
    if(err) return res.json(err)
  
    return res.status(200).json({success:true,msg:"Post has been updated."})
})
})
}
module.exports ={
    getAllPosts,
    getPostById,
    addPost,
    deletePost,
    updatePost
}