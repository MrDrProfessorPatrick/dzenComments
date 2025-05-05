import React, { useState } from 'react'
import { usePost } from '../hooks/PostContext'
import CommentList from './CommentsList'
import { RiQuestionAnswerLine } from "react-icons/ri";
import AddCommentForm from './AddCommentForm';

export default function Comment({id, user, message, image }) {
    const dateFormatter = new Intl.DateTimeFormat(undefined, {
        dateStyle: "short",
        timeStyle: "short",
      })

    const { getReplies, post, sendJsonMessage } = usePost()
    const childComments = getReplies(id)
    const [addCommentVisisble, showAddComment] = useState(false)

    return (
        <>
            <div className="comment">
                <div className="flex items-center gap-2">
                    <span className="name">{user.name}</span>
                    <button type='button' onClick={ () => {showAddComment(!addCommentVisisble)} } className='cursor-pointer'><RiQuestionAnswerLine /></button>
                    <span className="ml-10 text-xs" >{dateFormatter.format(new Date())}</span>
                </div>
            <div className="bg-green-200">
                {image && <img src={`/uploads/${image}`} height="320px" width="240px" alt="" />}
                {message}</div>
            {childComments && childComments.length > 0 && <div className='ml-2 bg-orange-200'>{<CommentList comments={childComments}/>}</div> }
            </div>
            { addCommentVisisble && <AddCommentForm postId={post.id} parentId={id} sendJsonMessage={sendJsonMessage} showAddComment={showAddComment} /> }
        </>
    )
 }