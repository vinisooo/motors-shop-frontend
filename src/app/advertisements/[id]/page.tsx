import { TAdvertisementRes } from "@/types/advertisement.types"
import { getData } from "@/utils/api"
import "../../../styles/pages/advertisement/advertisement.sass"
import AdvertisementInfo from "@/components/advertisementInfo/advertisementInfo"
import Footer from "@/components/footer/footer"
import CarImageModal from "@/components/modals/carImageModal"
import Comments from "@/components/comment/comments"
import { cookies } from "next/headers"

const getAdvertisement = async (id: string) => {
    try{
        const response = await getData(`/adverts/${id}`, {
            next: {
                revalidate: 60
            }
        })
        return response
    }catch(err: unknown){
        console.log(err)
    }
}

const Advertisement = async({params}: {params:{id: string}}) => {
    const advertisement: TAdvertisementRes = await getAdvertisement(params.id)
    const userToken = cookies().get("userToken")

    return(
            <div className="darker-bg page-show-up">
                <div className="advertisement-header"/>
                <main className="container">
                    <AdvertisementInfo userToken={userToken?.value} advertisement={advertisement}/>
                    <Comments postId={params.id}/>
                </main>
                <CarImageModal/>
                <Footer/>
            </div>
    )
}

export default Advertisement
