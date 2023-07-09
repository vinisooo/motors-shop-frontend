import Footer from "@/components/footer/footer"
import "../../styles/pages/profile/profile.sass"
import HeaderAnunciant from "@/components/headerAnunciant/headerAnunciant"
import { getData } from "@/utils/api"
import { TUser } from "@/types/user.types"
import { cookies } from "next/dist/client/components/headers"
import { Suspense } from "react"
import CarsList from "@/components/cardsList/cardsList"
import { CardsLoading } from "@/components/loadings/cardsLoading/cardsLoading"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"
import DeleteAdvertModal from "@/components/modals/deleteAdvertModal"
import { EditAdvertForm } from "@/components/forms/adverts/editAdvertForm"

const getUser=async(token:string)=>{
    try{
        const response=await getData("/users/loggedUser",{
            headers:{
                Authorization: `Bearer ${token}`
            },
            cache: "no-cache"
        })
        return response
    }catch(err: unknown){
        console.log(err)
        cookies().delete("userToken")
    }
}

const Profile = async() =>{
    const userToken= cookies().get("userToken")
    if(!userToken){
        toast.error("Você precisa estar logado para acessar o perfil de um usuário")
        redirect("/login")
    }
    const profile:TUser=await getUser( userToken.value)
    return ( 
        <div className="page-show-up">
            <header>
                <HeaderAnunciant anunciant={profile} profile={profile}/>
            </header>
            <main>
                <section className="cars">
                    <h2>Anúncios</h2>
                    <div className="cars-list">
                        <Suspense fallback={
                            <CardsLoading cards={6}/>
                        }>
                            <CarsList id={profile.id} userLogged={profile}/> 
                        </Suspense>
                    </div>
                </section>
            </main>       
            <DeleteAdvertModal/> 
            <Footer/>
        </div>
    )
}

export default Profile