import { Elipsis } from "../tags/tags"
import "../../styles/pages/advertisement/comments.sass"
import { TComments } from "@/schemas/comment.schema"

const Comment = ({comment}: {comment: TComments}) => {

    return(
        <li className="comment">
            <header>
                <Elipsis name={comment.user.name}/>
                <span>{comment.timeSince}</span>
            </header>
            <p>{comment.comment}</p>
        </li>
    )
}

export default Comment
