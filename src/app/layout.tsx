import { ReactNode} from "react"
import '../styles/style.sass'

import ModalProvider from "@/context/modalContext"
import { AuthProvider } from "@/context/authContext"
import CarsProvider from "@/context/carsContext"

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
              {children}
            </CarsProvider>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout