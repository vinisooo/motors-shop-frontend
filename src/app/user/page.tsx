'use client'
import { Cards } from "@/components/cards/cards"
import Footer from "@/components/footer/footer"
import HeaderProfile from "@/components/headerProfile/header"
import '../../styles/pages/profile/profile.sass'
import { TAdvert, TAdverts} from "@/schemas/advertsSchema"
import HeaderAnunciant from "@/components/headerAnunciant/headerAnunciant"
import { getData } from "@/uteis/api"
import { TUser } from "@/schemas/userSchema"
import { useAuthContext } from "@/context/authContext"

const getAdverts=async()=>{
    const response=await getData('/adverts')
    return response
}

const Profile = async() =>{

    const {user:profile}:{user:TUser}=useAuthContext()
    console.log(profile)
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
                            adverts.map((advert:TAdvert)=><Cards key={advert.id} car={advert} username={advert.user.name} owern={true}/>)
                        } 
                    </div>
                </section>
            </main>        
            <Footer/>
        </div>
    )
}

export default Profile