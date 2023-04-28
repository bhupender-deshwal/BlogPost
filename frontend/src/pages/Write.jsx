import React, { useState,useContext,useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import { axiosApiRequest } from '../utils/api';
import { useLocation,useNavigate } from 'react-router-dom';


const Write = () => {
    const {user}=useContext(AuthContext)
    const state= useLocation().state;
    const navigate=useNavigate()
    const [postData, setPostData] = useState({});
useEffect(()=>{
    setPostData({
        title:state?.title||'',
        file:'',
        desc:state?.desc||'',
        category:state?.category||'',
        date:moment().format(),
        userId:user?.id
    });
},[state])
    const handleChange =(name,value)=>{
        setPostData((p)=>({...p,[name]:value}))
    }
    const upload = async()=>{
       
           const formData = new FormData();
           formData.append("file", postData.file)
           const res = await axiosApiRequest({method:'post',url:`/upload`,data:formData})
        return res.file;
    }
    const handleSubmit =async(e)=>{
        let res;
        e.preventDefault();
       const imgUrl= await upload();
       const {date,userId,...rest}=postData
       state?
       res = await axiosApiRequest({method:'put',url:`/posts/${state.id}`,data:{...rest,file:rest.file?imgUrl:''}})
       :
        res = await axiosApiRequest({method:'post',url:`/posts/create`,data:{...postData,file:rest.file?imgUrl:''}})
       navigate('/')
    }
    return (
       <div className="writePost">
           <div className="content">
               <input type="text" placeholder='Title' value={postData.title} onChange={(e)=>handleChange('title',e.target.value)}/>
               <div className="editorContainer">
                <ReactQuill className='editor' theme="snow" value={postData.desc} onChange={(v)=>handleChange('desc',v)} />
               </div>
           </div>
           <div className="menu">
               <div className="item">
                   <h1>Publish</h1>
                   <span>
                       <b>Status: </b>Draft
                   </span>
                   <span>
                       <b>Visiblity: </b>Public
                   </span>
                   <input style={{display:"none"}} type="file" name="file" id="file" onChange={(e)=>handleChange('file',e.target.files[0])}/>
                   <label className="file" htmlFor="file">Upload Image</label>
                   <div className="buttons">
                       <button>Save as draft</button>
                       <button onClick={handleSubmit}>Publish</button>
                   </div>
               </div>
               <div className="item">
                   <h1>Category</h1>
                   <div className="cat">
                   <input type="radio" checked={postData.category=== "art"} name='category' value='art' id="art" onChange={(e)=>handleChange('category',e.target.value)}/>
                   <label htmlFor="art">Art</label></div>
                   <div className="cat">
                   <input type="radio" checked={postData.category=== "science"} name='category' value='science' id="science" onChange={(e)=>handleChange('category',e.target.value)}/>
                   <label htmlFor="science">Science</label></div>
                   <div className="cat">
                   <input type="radio" checked={postData.category=== 'technology'} name='category' value='technology' id="technology" onChange={(e)=>handleChange('category',e.target.value)}/>
                   <label htmlFor="technology">Technology</label></div>
                   <div className="cat">
                   <input type="radio" checked={postData.category==='cinema'} name='category' value='cinema' id="cinema" onChange={(e)=>handleChange('category',e.target.value)}/>
                   <label htmlFor="cinema">Cinema</label></div>
                   <div className="cat">
                   <input type="radio" checked={postData.category==='design'} name='category' value='design' id="design" onChange={(e)=>handleChange('category',e.target.value)}/>
                   <label htmlFor="design">Design</label></div>
                   <div className="cat">
                   <input type="radio" checked={postData.category==='food'} name='category' value='food' id="food" onChange={(e)=>handleChange('category',e.target.value)}/>
                   <label htmlFor="food">Food</label></div>
               </div>
           </div>
       </div>
    )
}

export default Write