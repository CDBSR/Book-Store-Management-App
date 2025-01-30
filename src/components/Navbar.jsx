import { useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const {auth, logout} = useState(AuthContext);
    const navigate = useNavigate();
    console.log(auth, 'auth');

    return (
        <>
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/books'>Books</Link>
            <Link to='/login'>Login</Link>
            <button onClick={logout}>Logout</button>
        </nav>
        </>
    )
}