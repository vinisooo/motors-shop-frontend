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
    const [comment, setComment] = useState("")
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
        console.log(data)
        data.comment = comment
        setDisabled(true)
        setComment("")
    }

    const setAutoComment = (autoComment: string) => {
        setComment(autoComment)
        setDisabled(false)
    }

    const autoComments = ["Gostei Muito!", "Incrível", "Recomendarei para meus amigos!"]

    return(
        <form className="comment-form" onSubmit={handleSubmit(submit)}>
            <div className="text-area-btn">
                <TextArea value={comment} onChange={(e)=> setComment(e.target.value)} placeholder="Insira o seu comentário aqui..." onKeyUp={habilityButton} className="complete-last" register={{...register("comment")}}/>
                <Button disabled={disabled} onClick={()=>setValue("postId",postId)}>Comentar</Button>
            </div>
            <div className="auto-comment">
                {
                    autoComments.map((autoComment, index) => {
                        if(autoComment.toLowerCase().includes(comment.toLowerCase())){
                            return(
                                <Button type="button" key={index} Style="negative-1" onClick={()=>setAutoComment(autoComment)}>{autoComment}</Button>
                            )
                        }
                    })
                }
            </div>
        </form>
    )
}

export {CommentInput}