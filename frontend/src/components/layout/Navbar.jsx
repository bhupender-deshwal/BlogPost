import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const Navbar = () => {
    const {user,logout} = useContext(AuthContext)
    return (
        <div className='navbar'>
            <div className="nav-container">
                <div className="logo">
                <Link to="/" className="link">
                    <img src="https://fakeimg.pl/100x100/" alt="logo_image" />
                    </Link>
                </div>
                <div className="links">
                    <Link className="link" to="/?category=art"><h5>ART</h5></Link>
                    <Link className="link" to="/?category=science"><h5>SCIENCE</h5></Link>
                    <Link className="link" to="/?category=technology"><h5>TECHNOLOGY</h5></Link>
                    <Link className="link" to="/?category=cinema"><h5>CINEMA</h5></Link>
                    <Link className="link" to="/?category=design"><h5>DESIGN</h5></Link>
                    <Link className="link" to="/?category=food"><h5>FOOD</h5></Link>

                    <span>{user?.userName}</span>
                    {user ?<span onClick={logout}>Logout</span>:<Link to="/login" className="link">Login</Link>}
                    <span className='write'>
                        <Link to="/write" className="link"><h5>Write</h5></Link>
                    </span>

                </div>
            </div>
        </div>
    )
}

export default Navbar