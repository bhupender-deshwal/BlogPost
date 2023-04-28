import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { axiosApiRequest } from '../utils/api'


const Register = () => {
    const [userInputs,setUserInputs] = useState({
        name:'',
        email:'',
        password:''
    })
    const [err,setErrors] = useState('')
    const navigate=useNavigate()

    const handleOnChange = (e) => {
        setUserInputs((pre)=>({ ...pre, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axiosApiRequest({ method: "post", url: "/auth/register", data: userInputs })
        if(res.success){
            navigate('/login')
        }
        else{
            setErrors(res.msg)
        }

    }
    return (
        <div className='auth'>
            <h1>Register</h1>
            <form autoComplete="off">
                <input required type="text" placeholder='Name' name='name' onChange={handleOnChange} />
                <input required type="text" placeholder='Email' name='email' onChange={handleOnChange}/>
                <input required type="password" placeholder='Password' name='password'onChange={handleOnChange} />
                <button onClick={handleSubmit}>Register</button>
               {err && <p>{err}</p>}
                <span>Do you have an account? <Link to={'/login'}>Login</Link></span>
            </form>
        </div>
    )
}

export default Register