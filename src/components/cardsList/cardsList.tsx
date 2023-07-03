import { Cards } from "../cards/cards"
import { Car,TCar, TCars } from "@/schemas/advertsSchema"
import { TUser } from "@/schemas/userSchema"
import { getData } from "@/uteis/api"


const getAdverts=async(id:string)=>{
    const response=await getData(`/users/${id}/adverts`)
    return response
}
  
const CarsList=async({id,userLogged}:{id:string,userLogged:TUser})=>{

    const advertisements=await getAdverts(id)
    const {data}=advertisements
    const {adverts,user}:{adverts:TCars,user:TUser}=data

    return (
        <>
            {
                adverts ? 
                adverts.map((advert:TCar)=><Cards key={advert.id} car={Car.parse(advert)} anunciant={user} user={userLogged}/>)
                :
                <h1>
                    você não possui nenhum anuncio ainda
                </h1>

            }
        </>
    )
        
}

export default CarsList