import React,{useEffect,useState,useContext} from 'react'
import { useLocation,Link,useNavigate } from 'react-router-dom'
import { axiosApiRequest } from '../utils/api'
import { AuthContext } from '../context/authContext'
import Menu from '../components/Menu'
import moment from 'moment'

const SinglePost = () => {
    const [post,setPost]=useState({})
   const location = useLocation();
   const navigate = useNavigate()
   const {user} = useContext(AuthContext)
   const postId = location.pathname.split('/')[2]
    useEffect(()=>{
        const fetchPost =
        async()=>{
            const res=await axiosApiRequest({method:'get',url:`/posts/${postId}`})
            setPost(res?.post)
        };
        fetchPost()
    },[postId])
    const handleDelete = async(e)=>{
        const res = await axiosApiRequest({method:'delete',url:`/posts/${postId}`})
        if(res.success){
            navigate('/')
        }
        else{
            alert(res?.msg)
        }
    }
    const getTextFromHtml =(html)=>{
        const doc = new DOMParser().parseFromString(html,"text/html")
        return doc.body.textContent
    }
    return (
        <div className='single'>
            <div className="content">
            {post.img &&  <img src={require(`../../../BackEnd/uploads/${post?.img}`)} alt="post image" />}
                <div className="user">
                {post?.userImage && <img src={post?.userImage} alt="" />}
                    <div className="info">
                        <span>
                            {post?.userName}
                        </span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                   {post?.userName === user?.userName && 
                   <div>
                        <Link className='link' to={`/write/?edit=${postId}`} state={post}>Edit </Link>
                        <Link className='link' onClick={handleDelete}>Delete</Link>
                    </div>
                    }
                </div>
                <h1>{post?.title}</h1>
                <p>
                   {getTextFromHtml(post?.desc)}
                </p>
            </div>
            <Menu category={post?.category}></Menu>
        </div>
    )
}

export default SinglePost