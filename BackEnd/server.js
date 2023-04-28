const express = require('express');
const app = express();
const auth = require('./routes/auth');
const users = require('./routes/users');
const posts = require('./routes/posts');
const cookieParser = require('cookie-parser');
const multer  = require('multer')
const PORT = 5000;
const cors = require('cors');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'BackEnd/uploads')
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.use(cors({
    credentials: true,
    origin:true
}));
app.use(express.json());
app.use(cookieParser());

app.post('/api/upload', upload.single('file'),  (req, res)=> {
    res.status(200).json({success: true,msg:"Upload successful",file:req.file.filename})
  })
app.use('/api/auth',auth);
app.use('/api/user',users);
app.use('/api/posts',posts);



app.listen(PORT,()=>console.log('Server listening on port: '+PORT));