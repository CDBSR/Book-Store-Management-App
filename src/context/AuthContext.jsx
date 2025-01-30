import React, { Children, createContext, useState } from "react";
import { useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        token: null
    });

    const login = async (username, password) => {
        try{
            const response = await fetch('https://decorous-exuberant-nightshade.glitch.me/login',{
                method:'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify({username, password})
            });

            const data = await response.json();

            if(data.success) {
                setAuth({
                    isAuthenticated: true,
                    token: data.token
                });

                localStorage.setItem('token', data.token);
                return {success: true};
            }
            else {
                return {success: false, message: data.message};
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