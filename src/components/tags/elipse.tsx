"use client"

import "../../styles/components/tags/tags.sass"
import getInitials from "@/utils/getInitials"
import { useRouter } from "next/navigation"

interface IElipsis{
    name:string
    className?:string
    color?: "purple-1" | "purple-2" |"purple-3"| "purple-4" | "purple-5" |"purple-6" | "green-1" | "green-2" | "green-3" | "pink-1" | "pink-2" | "pink-3" 
} 


const Elipsis=({color="purple-1",name="nome",className}:IElipsis)=>{

    const router=useRouter()

    const visitAnunciant=(e:any)=>{
        const page=e.currentTarget.classList[1]
        router.push(`/user/${page}`)
    }

    const initials = getInitials(name)

    return(
        <div onClick={visitAnunciant} className={`div-elipsis ${className}`}>
            <div className={`elipsis ${color}`}>
                <p>{initials}</p>
            </div> 
            <p className="anunciant">{name}</p>
        </div>
    )
}

export default Elipsis
