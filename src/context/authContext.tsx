"use client"
import api from "@/services";
import { TLoginReq, TLoginRes, TProviderProps, TUserRes, TValidationSchema } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { setCookie,destroyCookie } from "nookies";
import { createContext, useContext, useState } from "react";
import { TResetPasswordEmailReq, TResetPasswordReq } from "@/schemas/users.schema"
import axios,{ AxiosResponse } from "axios"

import { SetStateAction } from "react";

export interface IAuthContext {
  registerUser: (data: TValidationSchema) => Promise<void>
  login: (dataLogin: TLoginReq, callback: () => void) => Promise<void>
  getUserProfile: (token: string) => Promise<void>
  user: TUserRes
  logout: () => void
  sentEmail: boolean
  existantUser: boolean
  loading: boolean
  setSentEmail: React.Dispatch<SetStateAction<boolean>>
  setExistantUser: React.Dispatch<SetStateAction<boolean>>
  setLoading: React.Dispatch<SetStateAction<boolean>>
  sendResetPasswordEmail: (data: TResetPasswordEmailReq) => Promise<AxiosResponse<any, any> | undefined>
  resetPassword: (data: TResetPasswordReq, token: string) => Promise<AxiosResponse<any, any> | undefined>
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({children}: TProviderProps) => {
    const [user, setUser] = useState({} as TUserRes)
    const router = useRouter()
    const [sentEmail, setSentEmail] = useState<boolean>(false)
    const [existantUser, setExistantUser] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    
    const registerUser = async (data: TValidationSchema) => {
        try {
            const newUser: TUserRes = await api.post("/users/register", data, {
                headers: {
                  "Content-Type": "application/json"
                }
            })
            setUser(newUser)
            console.log(newUser)
            router.push("/login")
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

    const login = async (dataLogin: TLoginReq, callback: () => void) => {
        setExistantUser(true)
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
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if(err.response.status === 400){
                        setExistantUser(false)
                    }
                }
            }
            console.error(err)
      }
      finally{
        setLoading(false)
      }
    }

    const sendResetPasswordEmail = async(data: TResetPasswordEmailReq) => {
        setLoading(true)
        setExistantUser(true)
        setSentEmail(false)
        try{
            const request = await api.post("/users/resetPassword",data)

            if(request.status === 200){
                setSentEmail(true)
            }
            return request
        }catch(err: unknown){
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if(err.response.status === 404){
                        setExistantUser(false)
                    }
                }
              }
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const resetPassword = async(data: TResetPasswordReq,token: string) => {
        setExistantUser(true)
        try{
            const request = await api.patch(`/users/resetPassword/${token}`,data)

            router.push("/login")
            return request
        }catch(err: unknown){
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if(err.response.status === 404){
                        setExistantUser(false)
                    }
                }
              }
            console.log(err)
        }
    }
    
    return (
        <AuthContext.Provider 
            value={{
                registerUser,
                login,
                user,
                getUserProfile,
                logout,
                sentEmail,
                existantUser,
                loading,
                setSentEmail,
                setExistantUser,
                setLoading,
                sendResetPasswordEmail,
                resetPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext =() => useContext(AuthContext)
