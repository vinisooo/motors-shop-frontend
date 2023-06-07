interface iInput{
    children?:React.ReactNode
    placeholder?:string
    id?:string
    type?: "text" | "number" | "email" | "password" | "select" | "radio" 
}

interface iTextArea{
    children?:React.ReactNode
    placeholder?:string
    id?:string
}

interface iSelect{
    name:string
    children?:React.ReactNode
    placeholder?:string
    id:string
    label?: string
}

const Input=({children,id,placeholder,type='text'}:iInput)=>{
    return(
        <div className="label">
            <label htmlFor={ id}>{children}</label>
            <input id={id} type={type} placeholder={placeholder}/>
        </div>
    )
}

const TextArea=({ children,id,placeholder,}:iTextArea)=>{

    return(
        <div className="label">
            <label htmlFor={id}>{children}</label>
            <textarea name={id} id={id} cols={50} rows={10} placeholder={placeholder}></textarea>
        </div>
    )
}

const Select=({label,children,id,placeholder}:iSelect)=>{
    return(
        <div className="label">
            <label htmlFor={id}>{label}</label>
            <select defaultValue={placeholder}> 
                {children}
            </select>
        </div>
    )
}

export {Input,TextArea,Select}