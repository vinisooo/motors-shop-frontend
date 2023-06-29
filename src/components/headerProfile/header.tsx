import "../../styles/components/header/header.sass"
import Link from "next/link"
import Logo from "../logo/logo"
import { getData } from "@/uteis/api"
import { cookies } from 'next/headers'
import NavHeader from "./navHeader"

const getUserToken=async()=>{
    const userToken = cookies().get('userToken')
    const request= userToken && await getData('/users/loggedUser',{
        headers:{
            Authorization: `Bearer ${userToken?.value}`
        }
    })
    return request
}

const HeaderProfile = async() => {
    const user=await getUserToken()
    
    return(
        <div className="main-header">
            <Link href="/">
                <Logo/>
            </Link>
            <NavHeader {...user}/>
        </div>
    )
}

export default HeaderProfile