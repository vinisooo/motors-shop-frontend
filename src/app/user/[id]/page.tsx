import { TCars } from "@/schemas/advertsSchema"
import { getData } from "@/uteis/api"

const getAdverts=async(id:string)=>{
    const response=await getData(`/users/${id}/adverts`)
    return response
}

const Profile = async() =>{
    const {user:anunciant}=await getAdverts("4f4a63d1-410f-42cb-b8f4-8bb76b371225")
    const {adverts}:{adverts:TCars}=anunciant

    return ( 
        <>

            <h1>ops</h1>
            {/* <header>
                <HeaderProfile name={profile.name}/>
                <HeaderAnunciant anunciant={anunciant} profile={profile}/>
            </header>
            <main>
                <section className="cars-section">
                    <h2>Anúncios</h2>
                    <div className="cars-list">
                        {
                            adverts.map((advert:TCar)=><Cards key={advert.id} car={advert} username={anunciant.name}/>)
                        }
                    </div>
                </section>
            </main>        
            <Footer/> */}
        </>
    )
}

export default Profile