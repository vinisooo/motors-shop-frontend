interface iInput extends React.InputHTMLAttributes<HTMLInputElement>{
    children?:React.ReactNode
    register?: object
    imgUrl?: string
}

interface iTextArea extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    children?:React.ReactNode
    register?:object,
    size?:{
        heigth?:number
        heigthType?:string
        width?:number
        widthType?:string
    }
}

interface iSelect extends React.SelectHTMLAttributes<HTMLSelectElement>{
    children?:React.ReactNode
    label?: string
    register?: object
}

const Input=({children,register, ...props}:iInput)=>{
    return(
        <div className={`label ${props.accept === "image/*" ? "img-input" : ""}`}>
            <label htmlFor={ props.id}>{children}</label>
            <input {...register}  {...props}/>
        </div>
    )
}

const TextArea=({ children,size,register, ...props}:iTextArea)=>{

    return(
        <div className="label">
            <label htmlFor={props.id}>{children}</label>
            <textarea {...register} name={props.id}  cols={props.cols || 50} rows={props.rows || 10} {...props}></textarea>
        </div>
    )
}

const Select=({label,children, register, ...props}:iSelect)=>{
    return(
        <div className="label">
            <label htmlFor={props.id}>{label}</label>
            <select {...register} defaultValue={props.placeholder}> 
                {children}
            </select>
        </div>
    )
}


export {Input,TextArea,Select}