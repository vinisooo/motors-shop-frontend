import PageCard from "../pageCard/pageCard"
import Comment from "./comment"
import "../../styles/pages/advertisement/comments.sass"
import { getData } from "@/uteis/api"
import { TCommentRes, TComments } from "@/schemas/comment.schema"
import { cookies } from "next/headers"
import { CommentInput } from "./commentForm"
import Link from "next/link"

const getComments = async(postId: string, token:string | undefined) => {
    try{
        const response=await getData(`/comments/${postId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
            next: {
                revalidate: 0
            }
        })

        return response
    }catch(err: unknown){
        console.log(err)
    }
}

const Comments = async({postId}:{postId: string}) => {
    const token = cookies().get("userToken")
    const comments: TCommentRes = await getComments(postId, token?.value)

    if(!token){
        return (
            <section className="comments">
                <PageCard>
                    <h3>Comentários</h3>
                    <p>
                        <Link href="/login">Efetue o login</Link> para ver os comentários deste veículo
                    </p>
                </PageCard>
            </section>
        )
    }
    return(
        <section className="comments">
            <PageCard>
                <h3>Comentários</h3>
                {
                    (!token || !comments.postComments) ?
                    <p>nenhum comentario</p>:
                    (
                        <ul>
                            {
                                comments.postComments.map((comment: TComments) =><Comment comment={comment}/>)
                            }
                        </ul>
                    )
                }
                {}
            </PageCard>
            <PageCard>
                <CommentInput postId={postId}/>
            </PageCard>
        </section>
    )
}

export default Comments
