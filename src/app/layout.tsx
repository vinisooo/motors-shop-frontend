import { ReactNode} from "react"
import '../styles/style.sass'

import ModalProvider from "@/context/modalContext"
import { AuthProvider } from "@/context/authContext"

interface iRootLayout{
  children:ReactNode
}
const RootLayout=({children}:iRootLayout)=>{
  
  return (
    <html>
      <body>
        <AuthProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout