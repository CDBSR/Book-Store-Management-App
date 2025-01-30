import React, { Children, createContext, useState } from "react";
import { useContext } from "react";
import axios from 'axios'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        token: null
    });

    const login = async (username, password) => {
        try{
            const repsonse = await axios (
                {
                    method : 'POST',
                    url: `https://decorous-exuberant-nightshade.glitch.me/login`,
                    data: {
                        username:username, password:password
                    }
                }
            );

            if(repsonse.data.success) {
                setAuth({
                    isAuthenticated: true,
                    token: repsonse.data.token
                });

                localStorage.setItem('token',repsonse.data.token);
                return {success: true};
            }
            else {
                return {success: false, message: repsonse.data.message};
            }
        } catch(error) {
            console.log("error in logging", error);
            return {success: false, message: 'An Error occured in login' };
        }
    }

    const logout = () => {
        setAuth({
            isAuthenticated: false,
            token: null
        });
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{auth, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if(!context) {
//         throw new Error ('UseAuth must be used within an AuthProvider');
//     }
//     return context;
// };