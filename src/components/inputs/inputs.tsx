import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from "react"

interface iInput{
    children?:React.ReactNode
    placeholder?:string
    id?:string
    type?: "text" | "number" | "email" | "password" | "select" | "radio" 
    register?: object
    list?: string
    value?: string
    onChangeCallBack?: (e:ChangeEvent<HTMLInputElement>)=> void | any
    onClickCallBack?: ()=> void | any
    maxLength?: number
}

interface iTextArea{
    children?:React.ReactNode
    placeholder?:string
    id?:string
    register?:object
}

interface iSelect{
    children?:React.ReactNode
    placeholder?:string
    id:string
    label?: string
    register?: object
}

const Input=({children,id,placeholder,type='text', register, list, value, onChangeCallBack, onClickCallBack, maxLength}:iInput)=>{
    return(
        <div className="label">
            <label htmlFor={ id}>{children}</label>
            <input {...register} value={value} onChange={onChangeCallBack} onClick={onClickCallBack} id={id} type={type} placeholder={placeholder} list={list} maxLength={maxLength}/>
        </div>
    )
}

const TextArea=({ children,id,placeholder,register}:iTextArea)=>{

    return(
        <div className="label">
            <label htmlFor={id}>{children}</label>
            <textarea name={id} id={id} cols={50} rows={10} placeholder={placeholder} {...register}></textarea>
        </div>
    )
}

const Select=({label,children,id,placeholder, register}:iSelect)=>{
    return(
        <div className="label">
            <label htmlFor={id}>{label}</label>
            <select {...register} defaultValue={placeholder}> 
                {children}
            </select>
        </div>
    )
}


export {Input,TextArea,Select}