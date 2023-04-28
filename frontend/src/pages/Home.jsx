import React,{useState,useEffect} from 'react'
import { Link,useLocation } from 'react-router-dom'
import { axiosApiRequest } from '../utils/api'


const Home = () => {
    const [posts,setPosts]=useState([])
   const category = useLocation().search;
    useEffect(()=>{
        const fetchPosts =
        async()=>{
            const res=await axiosApiRequest({method:'get',url:`/posts/${category && category}`})
            setPosts(res?.posts)
        };
        fetchPosts()
    },[category])
    const getTextFromHtml =(html)=>{
        const doc = new DOMParser().parseFromString(html,"text/html")
        return doc.body.textContent

    }
    return (
        <div className='home'>
            <div className="posts">
                {
                    posts.map((post)=>(
                        <div key={post.id} className="post">
                            <div className="img">
                            {post.img &&  <img src={require(`../../../BackEnd/uploads/${post.img}`)} alt="post img" />}
                            </div>
                            <div className="content">
                                <Link className="link" to={`/post/${post.id}`}>
                                <h1>{post.title}</h1>
                                </Link>
                                <p>{getTextFromHtml(post?.desc)}</p>
                                <button>Read more</button>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Home