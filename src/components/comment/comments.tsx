import PageCard from "../pageCard/pageCard"
import Comment from "./comment"
import "../../styles/pages/advertisement/comments.sass"
import { cache } from "react"
import { getData } from "@/uteis/api"
import { TCommentRes, TComments } from "@/schemas/comment.schema"
import { cookies } from "next/headers"

const getComments = async(postId: string, token:string) => {
    try{
        const response=await getData(`/comments/${postId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
            next: {
                revalidate: 10
            }
        })

        return response
    }catch(err: unknown){
        console.log(err)
    }
}

const Comments = async({postId}:{postId: string}) => {
    const token = cookies().get("userToken")
    const comments: TCommentRes = await getComments(postId, token!.value)

    console.log(comments)
    if(!token || comments.postComments.length === 0){
        return <></>
    }
    return(
        <section className="comments">

            <PageCard>
                <h3>Comentários</h3>
                <ul>
                    {
                        comments.postComments.map((comment: TComments) => {
                            return(
                                <Comment comment={comment}/>
                            )
                        })
                    }
                </ul>
            </PageCard>
            <PageCard>
                Campo para adicionar comentário deve vir aqui
            </PageCard>
        </section>
    )
}

export default Comments
