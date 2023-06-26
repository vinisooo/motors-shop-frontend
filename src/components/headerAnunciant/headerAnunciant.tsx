'use client'

import '../../styles/components/headerAnunciant/headerAnunciant.sass'
import { TUser } from "@/schemas/userSchema"
import Button from "../button/button"
import { Elipsis, Tag } from '../tags/tags'
import { useContext } from 'react'
import { ModalContext } from '@/context/modalContext'
import { CreateAdvertisementModal } from '../modals/createAdvertModal'

const HeaderAnunciant=({anunciant,profile}:{anunciant:TUser,profile:TUser})=>{

    const { createAdvertModal, setCreateAdvertModal } = useContext(ModalContext)

    return(
        <>
            <section className="header-profile">
                <div className="profile"> 
                    <div>
                        <Elipsis name={anunciant.name}/>
                        {
                            profile.isAdvertiser &&
                            <Tag>anunciante</Tag>           
                        }
                    </div> 
                    <p className="description">{anunciant.description}</p>
                    {
                        profile.id==anunciant.id && profile.isAdvertiser && <Button style={'outline-brand-1'} onClick={()=> setCreateAdvertModal(true)}>Criar anúncio</Button>        
                    }
                </div>
            </section>
            {
                createAdvertModal &&
                <CreateAdvertisementModal/>
            }
        </>
    )
}


export default HeaderAnunciant