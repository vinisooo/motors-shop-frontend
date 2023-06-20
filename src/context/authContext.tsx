"use client"
import api from "@/services";
import { TLoginReq, TLoginRes, TProviderProps, TUserRes, TValidationSchema } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { createContext, useContext, useState } from "react";

export interface IAuthContext {
  registerUser: (data: TValidationSchema) => Promise<void>;
  login: (dataLogin: TLoginReq, callback: () => void) => Promise<void>
  getUserProfile: (token: string) => Promise<void>
  user: TUserRes
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({children}: TProviderProps) => {
    const [user, setUser] = useState({} as TUserRes)
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

    const getUserProfile = async (token: string) => {
        try {
            const { data } = await api.get<TUserRes>("/users/loggedUser", {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
            })
            setUser(data)
            await router.push("/")
        } catch (err) {
            console.error(err)
        }
    }

    const login = async (dataLogin: TLoginReq, callback: () => void) => {
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
            router.push("/")
      } catch (err) {
            console.error(err)
      }
    }
    
    return (
        <AuthContext.Provider 
            value={{
                registerUser,
                login,
                user,
                getUserProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)