import getInitials from "@/uteis/getInitials"
import "../../styles/components/tags/tags.sass"
import {TbBrandCashapp} from "react-icons/tb"
import { redirect } from "next/navigation"

interface iTag{
    children: React.ReactNode
    type?: "advertisement" | "inative" | "ative" | "cash"
}

interface iElipsis{
    name:string
    className?:string
    color?: "purple-1" | "purple-2" |"purple-3"| "purple-4" | "purple-5" |"purple-6" | "green-1" | "green-2" | "green-3" | "pink-1" | "pink-2" | "pink-3" 
} 

const Elipsis=({color="purple-1",name="nome",className}:iElipsis)=>{

    const initials = getInitials(name)


    return(
        <div className={`div-elipsis ${className}`}>
            <div className={`elipsis ${color}`}>
                <p>{initials}</p>
            </div> 
            <p className="anunciant">{name}</p>
        </div>
    )
}


const Tag=({children,type="advertisement"}:iTag)=>{


    switch(type){
        case "advertisement":
            return(
                <div className="tag">
                    <p>{children}</p>
                </div>
            )
        case "inative":
            return(
                <div className="tag-inative">
                    <p>Inativo</p>
                </div>
            )

        case "ative":
            return(
                <div className="tag-ative">
                    <p>Ativo</p>
                </div>
            )

        case "cash":
            return(
                <div className="tag-cash">
                    <i><TbBrandCashapp/></i>
                </div>
            )
    }
    
    
}


export  {Tag,Elipsis}