import PageCard from "../pageCard/pageCard"
import Comment from "./comment"
import "../../styles/pages/advertisement/comments.sass"
import { getData } from "@/uteis/api"
import { TCommentRes, TComments } from "@/schemas/comment.schema"
import { cookies } from "next/headers"
import { CommentInput } from "./commentForm"
import { redirect } from "next/navigation"

const getComments = async(postId: string, token:string) => {
    try{
        const response=await getData(`/comments/${postId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
            next: {
                revalidate: 60
            }
        })

        return response
    }catch(err: unknown){
        console.log(err)
    }
}

const Comments = async({postId}:{postId: string}) => {
    const token = cookies().get("userToken")
    !token && redirect('/login')
    const comments: TCommentRes = await getComments(postId, token!.value)

    return(
        <section className="comments">

            <PageCard>
                <h3>Comentários</h3>
                {
                    (!token || comments.postComments.length === 0) ? 
                    <p>nenhum comentario</p> :
                    (
                        <ul>
                            {
                                comments.postComments.map((comment: TComments) => {
                                    return(
                                        <Comment comment={comment}/>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </PageCard>
            <PageCard>
                <CommentInput postId={postId}/>
            </PageCard>
        </section>
    )
}

export default Comments
