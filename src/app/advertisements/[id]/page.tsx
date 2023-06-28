import { TAdvertisementRes } from "@/schemas/advertisement.schema"
import { getData } from "@/uteis/api"
import { cache } from "react"
import "../../../styles/pages/advertisement/advertisement.sass"
import HeaderProfile from "@/components/headerProfile/header"
import AdvertisementInfo from "@/components/advertisementInfo/advertisementInfo"

export const getAdvertisement = cache(async (id: string) => {
    try{
        const response = await getData(`/adverts/${id}`)
        return response
    }catch(err: unknown){
        console.log(err)
    }
})


const Advertisement = async({params}: {params:{id: string}}) => {
    const advertisement: TAdvertisementRes = await getAdvertisement(params.id)

    return(
        <div className="darker-bg">
            <HeaderProfile/>
            <div className="advertisement-header"/>
            <main className="container">
                <AdvertisementInfo advertisement={advertisement}/>
            </main>
        </div>
    )
}

export default Advertisement
