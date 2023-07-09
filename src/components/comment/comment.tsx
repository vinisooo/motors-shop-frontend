"use client"

import { Elipsis } from "../tags/tags"
import "../../styles/pages/advertisement/comments.sass"
import { TComments } from "@/types/comment.types"
import { useUserContext } from "@/context/userContext"
import { MdDelete } from "react-icons/md"
import { useState, useEffect, useRef } from "react"
import { BsCheck } from "react-icons/bs"
import { useRouter } from "next/navigation"

const Comment = ({ comment }: { comment: TComments }) => {
    const [readyToDelete, setReadyToDelete] = useState<boolean>(false)
    const [deleted, setDeleted] = useState<boolean>(false)
    const deleteButtonRef = useRef<HTMLButtonElement>(null)

    const router = useRouter()

    const { user, deleteComment } = useUserContext()

    const handleDeleteComment = () => {
        if(readyToDelete){
            deleteComment(comment.id)
            setDeleted(true)
            router.refresh()
        }else{
            setReadyToDelete(true)
        }
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
        deleteButtonRef.current &&
        !deleteButtonRef.current.contains(event.target as Node)
        ) {
        setReadyToDelete(false)
        }
    }

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside)
        return () => {
        window.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <li className={`comment ${deleted && "delete-animation"}`}>
            <header>
                <Elipsis name={comment.user.name} />
                <span>{comment.timeSince}</span>
                {user.id === comment.user.id && (
                <button
                    ref={deleteButtonRef}
                    onClick={handleDeleteComment}
                    className={`delete-comment ${readyToDelete ? "confirm-delete" : ""}`}
                >
                    {readyToDelete ? (
                    <>
                        <BsCheck />
                    </>
                    ) : (
                    <MdDelete />
                    )}
                </button>
                )}
                {readyToDelete && (
                <span className="delete-message">
                    confirmar exclusão
                </span>
                )}
            </header>
            <p>{comment.comment}</p>
        </li>
    )
}

export default Comment
