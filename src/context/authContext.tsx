"use client"
import api from "@/services";
import { TLoginReq, TLoginRes, TProviderProps, TUserRes, TValidationSchema } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { setCookie,parseCookies,destroyCookie } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";

export interface IAuthContext {
  registerUser: (data: TValidationSchema) => Promise<void>;
  login: (dataLogin: TLoginReq, callback: () => void) => Promise<void>
  getUserProfile: (token: string) => Promise<void>
  user: TUserRes
  logout: () => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({children}: TProviderProps) => {
    const [user, setUser] = useState({} as TUserRes)
    const [loading,setLoading]=useState(false)
    const router = useRouter()

    const registerUser = async (data: TValidationSchema) => {
        try {
            const newUser: TUserRes = await api.post("/users/register", data, {
                headers: {
                  "Content-Type": "application/json"
                }
            })
            setUser(newUser)
            console.log(newUser)
            await router.push("/login")
        } catch (err) {
            console.error(err)
        }
    }

    const logout=()=>{
        destroyCookie(null, 'userToken')
        router.push('/')
    }
    
    const getUserProfile = async (token: string) => {
        try {
            const { data } = await api.get<TUserRes>("/users/loggedUser", {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
            })
            setUser(data)
            router.push("/user")
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(()=>{
        if(!loading){
            const {userToken} = parseCookies()
            getUserProfile(userToken)
        }

    },[loading])
    

    const login = async (dataLogin: TLoginReq, callback: () => void) => {
        setLoading(true)
        try {
            const { data } = await api.post<TLoginRes>("/users/login", dataLogin)
            const { token } = data
            setCookie(null, "userToken", token, {
                maxAge: 60 * 60 * 24 * 3,
                path: "/",
            })
            if (callback) {
                callback()
            }
            router.push("/user")
      } catch (err) {
            console.error(err)
      }
      finally{
        setLoading(false)
      }
    }
    
    return (
        <AuthContext.Provider 
            value={{
                registerUser,
                login,
                user,
                getUserProfile,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext =() => useContext(AuthContext)