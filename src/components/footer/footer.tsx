import "../../styles/components/footer/footer.sass"
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'

const Footer=()=>{

    return(
        <footer>
            <h1>Motors shop</h1>
            <p>&copy; 2022 -  Todos os direitos reservados.</p>
            <div>
                <i><MdOutlineKeyboardArrowUp/></i>
            </div>
        </footer>
    )
}

export default Footer