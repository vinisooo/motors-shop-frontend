import Footer from "@/components/footer/footer"
import HeaderProfile from "@/components/headerProfile/header"
import '../../styles/pages/profile/profile.sass'
import HeaderAnunciant from "@/components/headerAnunciant/headerAnunciant"
import { getData } from "@/uteis/api"
import { TUser } from "@/schemas/userSchema"
import { cookies } from "next/dist/client/components/headers"
import { Suspense } from "react"

import CarsList from "@/components/cardsList/cardsList"
import { CardsLoading } from "@/components/loadings/cardsLoading/cardsLoading"
import Link from "next/link"
import { redirect } from "next/navigation"

const getUser=async(token:string)=>{
    try{
        const response=await getData('/users/loggedUser',{
            headers:{
                Authorization: `Bearer ${token}`
            },
            next: {
                revalidate: 0
            },
        })
        return response
    }catch(err: unknown){
        console.log(err)
        cookies().delete("userToken")
    }
}

const Profile = async() =>{

    const cookieStore = cookies()
    const userToken= cookieStore.get('userToken')
    !userToken && redirect('/login')
    const profile:TUser=userToken && await getUser( userToken!.value)

    return ( 
        <div>
            <header>
                <HeaderProfile/>
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
            <Footer/>
        </div>
    )
}

export default Profile