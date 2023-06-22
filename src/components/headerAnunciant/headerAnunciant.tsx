'use client'

import '../../styles/components/headerAnunciant/headerAnunciant.sass'
import { TUser } from "@/schemas/userSchema"
import Button from "../button/button"
import getInitials from "@/uteis/getInitials"
import { Elipsis, Tag } from '../tags/tags'

const HeaderAnunciant=({anunciant,profile}:{anunciant:TUser,profile:TUser})=>{

    const createAdvert=()=>{
        console.log('advert')
    }

    return(
        <section className="header-profile">
            <div className="profile"> 
                <div>
                    <Elipsis name={anunciant.name}/>
                    <Tag>anunciante</Tag>           
                </div> 
                <p className="description">{anunciant.description}</p>
                {
                    profile.id==anunciant.id && profile.isAdvertiser && <Button style={'outline-brand-1'} onClick={createAdvert}>Criar anúncio</Button>        
                }
            </div>
        </section>
    )
}


export default HeaderAnunciant