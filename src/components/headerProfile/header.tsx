import "../../styles/components/header/header.sass"
import Link from "next/link"
import Logo from "../logo/logo"
import { getData } from "@/uteis/api"
import { cookies } from "next/headers"
import NavHeader from "./navHeader"
import { redirect } from "next/navigation"

const getUser=async()=>{
    try{
        const userToken = cookies().get("userToken")
        const request= userToken && await getData("/users/loggedUser",{
            headers:{
                Authorization: `Bearer ${userToken?.value}`
            },
            cache: "no-cache"
        })
        return request
    }catch(err: unknown){
        console.log(err)
        cookies().delete("userToken")
    }
}

const HeaderProfile = async() => {
    const user=await getUser()
    
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