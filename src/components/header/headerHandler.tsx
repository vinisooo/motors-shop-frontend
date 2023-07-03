import Header from "./header"
import HeaderProfile from "../headerProfile/header"
import { cookies } from "next/headers"

const HeaderHandler = () => {
    const token = cookies().get("userToken")

    return !token ? <Header/> : <HeaderProfile/>
}

export default HeaderHandler
