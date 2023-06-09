import "../../styles/pages/home/filterList.sass"
import Link from "next/link"

const FilterList = () => {
    return(
        <aside className="aside-filter">
            <div>
                <h4>Marca</h4>
                <ul className="filter-list">
                    <li>
                        <Link href="">
                            pipipi
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            pipipi
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h4>Cor</h4>
                <ul className="filter-list">
                    <li>
                        <Link href="">
                            amalero
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            ralanjado
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h4>Km</h4>
                <input placeholder="mínimo" className="filter-input"></input>
                <input placeholder="máximo" className="filter-input"></input>
            </div>
            <div>
                <h4>preço</h4>
                <input placeholder="mínimo" className="filter-input"></input>
                <input placeholder="máximo" className="filter-input"></input>
            </div>
        </aside>
    )
}

export default FilterList