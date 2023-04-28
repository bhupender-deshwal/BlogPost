import { createContext,useState,useEffect } from "react";
import { axiosApiRequest } from "../utils/api";

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [user,setUser]=useState(
        JSON.parse(localStorage.getItem('user'))||null
    )

    const login = async(userData)=>{
        const res = await axiosApiRequest({ method: "post", url: "/auth/login", data: userData })
        setUser(res?.user||null)
        return res
    }
    const logout = async()=>{
        const res = await axiosApiRequest({ method: "post", url: "/auth/logout"})
        setUser(null)
        return res
    }
    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(user))
    },[user])

    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}