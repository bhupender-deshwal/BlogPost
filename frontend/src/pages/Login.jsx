import React, { useState, useEffect,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {
    const [userData, setUserData] = useState({})
    const [err,setErrors] = useState('')
    const navigate=useNavigate()
    const {user,login,logout} = useContext(AuthContext)
    const handleOnChange = (e) => {
        setUserData((pre)=>({ ...pre, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
      const res = await login(userData)
        if(res.success){
            navigate('/')
        }
        else{
            setErrors(res.msg)
        }

    }
    return (
        <div className='auth'>
            <h1>Login</h1>
            <form autoComplete="off">
                <input required type="text" placeholder='Email' name='email' onChange={handleOnChange} />
                <input required type="password" placeholder='Password' name='password' onChange={handleOnChange} />
                <button onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}
                <span>Don't you have an account? <Link to={'/register'}>Register</Link></span>
            </form>
        </div>
    )
}

export default Login