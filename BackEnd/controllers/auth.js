const db = require("../db")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "kjkljkjsdfhsjfuhge";


const register = (req,res)=>{
    const {name,email,password} = req.body;
// Check existing user
const query = 'SELECT * FROM users WHERE `email` = ? OR `userName` = ?'

db.query(query,[email,name],(err,data)=>{
    if(err) return res.json(err)
    if(data.length) return res.status(409).json({success:false,msg:'User already exists'})

// Create new user and hash password
    const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

const q = "INSERT INTO users (`userName`,`email`,`password`) VALUES(?)"
const values =[
    name,email,hash
]
db.query(q,[values],(err,data)=>{
    if(err) return res.json(err)
    return res.status(200).json({success:true,msg:"User has been created."})
})
})


}
const login = (req,res)=>{
    const {email,password} = req.body;
    // Check existing user
    const query = 'SELECT * FROM users WHERE `email` = ?'
    
    db.query(query,[email],(err,data)=>{
        if(err) return res.json(err)
        if(data.length === 0) return res.status(404).json({success:false,msg:"User not found!"})
        // Check password

      const isValid =  bcrypt.compareSync(password, data[0].password,);
        if(!isValid){
          return  res.status(403).json({success:false,msg:"Incorrect password!"})
        }

    const token = jwt.sign({id: data[0].id},JWT_SECRET,{ expiresIn: '1d' })
    const {password: pass,...other}=data[0];
    res.cookie("access_token",token,{
        httpOnly: true,
        secure: true,
        sameSite:"none"
    }).status(200).json({success:true,user:other})
    })
}
const logout = (req,res)=>{
   return res.clearCookie("access_token",{
        secure: true,
        sameSite:"none"
    }).status(200).json({success:true,msg:"User logged out!"})
  
}

module.exports = {
    register,
    login,
    logout
}