import { ReactNode } from "react"
import '../styles/reset.sass'


interface iRootLayout{
  children:ReactNode
}
const RootLayout=({children}:iRootLayout)=>{
  
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout