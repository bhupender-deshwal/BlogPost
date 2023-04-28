import React,{useState,useEffect} from 'react'
import { axiosApiRequest } from '../utils/api'

const Menu = (props) => {
  const {category}=props
  const [posts,setPosts]=useState([])
   useEffect(()=>{
       const fetchPosts =
       async()=>{
           const res=await axiosApiRequest({method:'get',url:`/posts/?category=${category}`})
           setPosts(res?.posts)
       };
       fetchPosts()
   },[category])
  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {
            posts.map((post)=>(
                <div className="post" key={post.id}>
                    {post.img &&  <img src={require(`../../../BackEnd/uploads/${post?.img}`)} alt="post image" />}
                    <h2>{post.title}</h2>
                    <button>Read More</button>
                </div>
            ))
        }
    </div>
  )
}

export default Menu