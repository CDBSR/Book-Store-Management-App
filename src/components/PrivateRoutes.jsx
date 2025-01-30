import { Children, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import {Navigate} from 'react-router-dom';


export const PrivateRoutes = ({children}) => {
    const {auth} = useContext(AuthContext);
    return auth.token ? children : <Navigate to = '/login' />
}