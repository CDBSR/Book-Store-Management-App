import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'

export const Login = () => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate("/books");
        } catch(error) {
            console.log(error, 'in login');
        }
        
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="text" placeholder="username" onChange={(e) => setusername(e.target.value)}></input>
            <input type="password" placeholder="username" onChange={(e) => setpassword(e.target.value)}></input>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};