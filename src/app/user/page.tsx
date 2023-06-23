import { Cards } from "@/components/cards/cards"
import Footer from "@/components/footer/footer"
import HeaderProfile from "@/components/headerProfile/header"
import '../../styles/pages/profile/profile.sass'
import { TAdvert, TAdverts} from "@/schemas/advertsSchema"
import HeaderAnunciant from "@/components/headerAnunciant/headerAnunciant"
import { getData } from "@/uteis/api"
import { TUser } from "@/schemas/userSchema"
import { cookies } from "next/dist/client/components/headers"

const getAdverts=async()=>{
    const response=await getData('/adverts', {cache:"no-cache"})
    return response
}

const getUser=async(token:string)=>{
    const response=await getData('/users/loggedUser',{
        headers:{
            Authorization: `Bearer ${token}`
        },
        cache: "no-cache"
    })
    return response
}

const Profile = async() =>{

    const cookieStore = cookies()
    const userToken= cookieStore.get('userToken')
    const profile:TUser=await getUser( userToken!.value)

    const {adverts}:{adverts:TAdverts}=await getAdverts()

    return ( 
        <div>
            <header>
                <HeaderProfile name={profile.name}/>
                <HeaderAnunciant anunciant={profile} profile={profile}/>
            </header>
            <main>
                <section className="cars">
                    <h2>Anúncios</h2>
                    <div className="cars-list">
                        {
                            adverts?.map((advert:TAdvert)=><Cards key={advert.id} car={advert} user={advert.user} userId={profile.id}/>)
                        } 
                    </div>
                </section>
            </main>        
            <Footer/>
        </div>
    )
}

export default Profile