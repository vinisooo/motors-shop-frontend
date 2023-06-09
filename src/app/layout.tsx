import { ReactNode} from "react"
import '../styles/reset.sass'

import ModalProvider from "@/context/modalContext"

interface iRootLayout{
  children:ReactNode
}
const RootLayout=({children}:iRootLayout)=>{
  
  return (
    <html>
      <body>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  )
}

export default RootLayout