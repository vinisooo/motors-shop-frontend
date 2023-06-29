"use client"
import { FormEventHandler, useState } from "react"
import Button from "../button/button"
import { TextArea } from "../inputs/inputs"
import { useAuthContext } from "@/context/authContext"
import { useForm } from "react-hook-form"
import { TCommentReqSchema, TCommentRes, commentReqSchema } from "@/schemas/comment.schema"
import { zodResolver } from "@hookform/resolvers/zod"

const CommentInput=({postId}:{postId:string})=>{

    const [disabled,setDisabled]=useState(true)
    const {createComment}=useAuthContext()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<TCommentReqSchema>({
        resolver: zodResolver(commentReqSchema)
    })


    const habilityButton=(event:any)=>{
        const {value}=event.target
        value ? setDisabled(false) : setDisabled(true)
    }

    const submit = (data:TCommentReqSchema, e:any) => {
        e.target.reset()
        createComment(data);
        setDisabled(true)
      };


    return(
        <form onSubmit={handleSubmit(submit)}>
            <TextArea onKeyUp={habilityButton} className='complete-last' register={{...register("comment")}}/>
            <Button disabled={disabled} onClick={()=>setValue('postId',postId)}>Comentar</Button>
        </form>
    )
}

export {CommentInput}