import '../../../styles/components/loadings/filter/filter.sass'

const FilterLoading=()=>{

    return (
        <div className='filter'>
            <div className="filter-field">
                {
                    Array.from({ length: 9 }).map((el)=>
                        <>
                            <h4/>
                            <ul className="filter-field-list">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export {FilterLoading}