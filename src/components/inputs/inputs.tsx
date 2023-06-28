import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from "react"

interface iInput extends React.InputHTMLAttributes<HTMLInputElement>{
    children?:React.ReactNode
    placeholder?:string
    register?: object
    list?: string
}

interface iTextArea extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    children?:React.ReactNode
    register?:object
}

interface iSelect extends React.SelectHTMLAttributes<HTMLSelectElement>{
    children?:React.ReactNode
    label?: string
    register?: object
}

const Input=({children,register, list, ...props}:iInput)=>{
    return(
        <div className="label">
            <label htmlFor={ props.id}>{children}</label>
            <input {...register}  list={list} {...props}/>
        </div>
    )
}

const TextArea=({ children,register, ...props}:iTextArea)=>{

    return(
        <div className="label">
            <label htmlFor={props.id}>{children}</label>
            <textarea name={props.id}  cols={50} rows={10} {...props} {...register}></textarea>
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