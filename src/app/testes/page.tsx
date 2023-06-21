'use client'
import { useState } from "react"



const PageTeste=()=>{

    const [contador,setContador]=useState(0)

    return (
        <body>
            <button onClick={()=>setContador(contador+1)}> aumentar </button>
            <h1>{contador}</h1>
        </body>
    )
}

export default PageTeste