interface iInput{
    children?:React.ReactNode
    placeholder?:string
    id?:string
    type?: 'text' | 'number' | 'email'
}

interface iTextArea{
    children?:React.ReactNode
    placeholder?:string
    id?:string
}

const Input=({children,id,placeholder,type='text'}:iInput)=>{
    return(
        <div className="div-input">
            <label htmlFor={ id}>{children}</label>
            <input id={id} type={type} placeholder={placeholder}/>
        </div>
    )
}

const TextArea=({ children,id,placeholder,}:iTextArea)=>{

    return(
        <div className="div-text-area">
            <label htmlFor={id}>{children}</label>
            <textarea name={id} id={id} cols={50} rows={10} placeholder={placeholder}></textarea>
        </div>
    )
}

export {Input,TextArea}