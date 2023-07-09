import { ReactNode} from "react"
import "../styles/style.sass"

import { ModalProvider } from "@/context/modalContext"
import { UserProvider } from "@/context/userContext"
import { CarsProvider } from "@/context/carsContext"
import Toastify from "@/components/toastify.tsx/toastify"
import HeaderHandler from "@/components/header/headerHandler"

interface IRootLayout{
  children:ReactNode
}


const RootLayout=({children}:IRootLayout)=>{
  
  return (
    <html>
      <head>
        <link rel='icon' href='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Eo_circle_purple_letter-m.svg/1200px-Eo_circle_purple_letter-m.svg.png'/>
        <title>Motors Shop</title>
      </head>
      <body>
        <UserProvider>
            <ModalProvider>
              <CarsProvider>
                <HeaderHandler/>
                {children}
              </CarsProvider>
            </ModalProvider>
        </UserProvider>
        <Toastify/>
      </body>
    </html>
  )
}

export default RootLayout