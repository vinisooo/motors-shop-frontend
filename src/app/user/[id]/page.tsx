import { Cards } from "@/components/cards/cards"
import Footer from "@/components/footer/footer"
import HeaderProfile from "@/components/headerProfile/header"
import "../../../styles/pages/profile/profile.sass"
import { getData } from "../../../uteis/api"
import { TAdvert, TCar, TCars } from "@/schemas/advertsSchema"
import { TUser } from "@/schemas/userSchema"
import { Elipsis } from "@/components/tags/tags"

const getAdverts=async(id:string)=>{
    const response=await getData(`/users/${id}/adverts`)
    return response
}

const getUser=async(id:string)=>{
    const response=await getData(`/users/user/${id}`)
    return response
}


const Profile = async() =>{

    const profile:TUser=await getUser("99a0ae79-5651-4a83-9509-08117d559d25")
    const {user:anunciant}=await getAdverts("5611a676-2dcc-4f36-becc-c9af080ae2ae")
    const {adverts}=anunciant


    const getIniciais=(name:string)=>{

        const names=name.split(" ")
        let iniciais

        switch (names.length) {
            case 1:
                iniciais= names[0][0]
                break;
            default:
                iniciais=names[0][0]+names[1][0]
                break;
        }
        return iniciais
    }

    const profileIniciais= getIniciais(profile.name)
    const anuncintInitials= getIniciais(anunciant.name)


    return ( 
        <>
            <header>
                <HeaderProfile name={profile.name} iniciais={profileIniciais} />
            </header>
            <main>
                <div className="profile">  
                    <Elipsis name={anunciant.name.toUpperCase()}>{anuncintInitials.toUpperCase()}</Elipsis>
                    <p className="tag">Anunciante</p>
                </div>            
                    <p className="description">{anunciant.description}</p>
                </div>
            <section className="cars-section">
                <div className="cars-list">
                {
                    adverts.map((advert:TAdvert)=><Cards key={advert.id} car={advert}/>)
                }
                </div>
            </section>
            </main>        
            <header className="header-profile" >
            <Footer/>
        </>
    )
}

export default Profile