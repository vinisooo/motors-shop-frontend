import Button from "@/components/button/button"
import '../../../styles/components/forms/adverts/deleteAdvert.sass'

import { getData } from "@/uteis/api"


const DeleteAdvert=async({id}:{id:string})=>{

    const deleteAdvert=async(id:string)=>{
        fetch(`http://localhost:3001/adverts/${id}`, {
        method: 'DELETE',
        headers:{
            Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODgxNDE1NTksImV4cCI6MTY4ODE0ODc1OSwic3ViIjoiOTRlMjZhNTQtODVkMS00OTUyLWEwYTMtNmNlNTlmNDg3MTBmIn0.MDFUTuosenpCn1g1DOYe8XEwAmPgP610Vutw5Z40Dzw`
        },
        cache:'no-store'
        }).then(
            ()=>console.log('sucess')
            
        ).catch(
            ()=>console.log('erro')
        )
    }

    return(
        <div className="div-delete">
            <h3>deseja mesmo deletar esse anuncio?</h3>
            <div className="div-buttons">
                <Button type={"button"} Style={"confirm"} onClick={()=>deleteAdvert(id)}>Sim</Button>
                <Button type={"button"} Style={"cancel"} onClick={()=>console.log('fechar modal')}>Não</Button>
            </div>
        </div>

    )
}

export {DeleteAdvert}