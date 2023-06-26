import { Cards } from "@/components/cards/cards"
import Footer from "@/components/footer/footer"
import '../../../styles/pages/profile/profile.sass'
import HeaderAnunciant from "@/components/headerAnunciant/headerAnunciant"
import HeaderProfile from "@/components/headerProfile/header"
import {TCar, TCars } from "@/schemas/advertsSchema"
import { TUser } from "@/schemas/userSchema"
import { getData } from "@/uteis/api"

const getAdverts=async(id:string)=>{
    const response=await getData(`/users/${id}/adverts`,{next:{revalidate:60}})
    return response
}

const Profile = async({params}:{params:any}) =>{
    const {id}=params
    console.log(id)
    const {data}=await getAdverts(id)
    console.log(data)
    const adverts:TCars=data.adverts 
    const anunciant:TUser=data.user

    return ( 
        <>
            <h1>ops</h1>
            <header>
                <HeaderProfile name={"profile.name"}/>
                <HeaderAnunciant anunciant={anunciant} profile={anunciant}/>
            </header>
            <main>
                <section className="cars-section">
                    <h2>Anúncios</h2>
                    <div className="cars-list">
                        {
                            adverts.map((advert:TCar)=><Cards key={advert.id} car={advert} user={anunciant} userId={anunciant.id} />)
                        }
                    </div>
                </section>
            </main>        
            <Footer/>
        </>
    )
}

export default Profile