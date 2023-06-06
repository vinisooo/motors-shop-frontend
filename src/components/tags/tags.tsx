import "../../styles/components/tags/tags.sass"
import {TbBrandCashapp} from "react-icons/tb"

interface iTag{
    children: React.ReactNode
    type?: "advertisement" | "inative" | "ative" | "cash"
}

interface iElipsis{
    children: React.ReactNode
    name?:string
    color?: "purple-1" | "purple-2" |"purple-3"| "purple-4" | "purple-5" |"purple-6" | "green-1" | "green-2" | "green-3" | "pink-1" | "pink-2" | "pink-3" 
} 

const Elipsis=({children,color='purple-1',name}:iElipsis)=>{
    return(
        <div className="div-elipsis">
            <div className={`elipsis ${color}`}>
                <p>{children}</p>
            </div> 
            {
                name && <p className="anunciant">{name}</p>
            }
        
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