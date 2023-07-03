import { ReactNode} from "react"
import "../styles/style.sass"

import ModalProvider from "@/context/modalContext"
import { AuthProvider } from "@/context/authContext"
import CarsProvider from "@/context/carsContext"
import Toastify from "@/components/toastify.tsx/toastify"
import HeaderHandler from "@/components/header/headerHandler"

interface iRootLayout{
  children:ReactNode
}
const RootLayout=({children}:iRootLayout)=>{
  
  return (
    <html>
      <body>
        <AuthProvider>
            <ModalProvider>
              <CarsProvider>
                <HeaderHandler/>
                {children}
              </CarsProvider>
            </ModalProvider>
        </AuthProvider>
        <Toastify/>
      </body>
    </html>
  )
}

export default RootLayout