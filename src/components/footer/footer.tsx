"use client"

import "../../styles/components/footer/footer.sass"
import { MdOutlineKeyboardArrowUp } from "react-icons/md"


const Footer=()=>{

    const goToTop=()=>{
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
    }

    return(
        <footer>
            <h1>Motors shop</h1>
            <p>&copy; 2022 -  Todos os direitos reservados.</p>
            <div onClick={goToTop} className="top">
                <i><MdOutlineKeyboardArrowUp/></i>
            </div>
        </footer>
    )
}

export default Footer