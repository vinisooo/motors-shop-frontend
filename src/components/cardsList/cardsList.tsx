import { Cards } from "../cards/cards"
import { TCar, TCars } from "@/types/advertisement.types"
import { Car } from "@/schemas/advertisement.schema"
import { TUser } from "@/types/user.types"
import { getData } from "@/utils/api"

const getAdverts = async (id: string) => {
  const response = await getData(`/users/${id}/adverts/?perPage=999`, {
    next: {
      revalidate: 30
    }
  })
  return response
}

const CarsList = async ({ id, userLogged }: { id: string, userLogged: TUser }) => {
  const advertisements = await getAdverts(id)

  if (!advertisements || !advertisements.data) {
    return <h2>você não possui nenhum anúncio</h2>
  }

  const { adverts, user }: { adverts: TCars, user: TUser } = advertisements.data
  return (
    <>
      {adverts.length > 0 ?
        adverts.map((advert: TCar) => (
          <Cards key={advert.id} car={Car.parse(advert)} anunciant={user} user={userLogged} />
        ))
        :
        <h2>você não possui nenhum anúncio</h2>
      }
    </>
  )
}

export default CarsList
