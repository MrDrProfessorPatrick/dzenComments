import React from 'react'
import { usePost } from '../hooks/PostContext'
import CommentList from './CommentsList'

export default function Comment({ id, user, message }) {

    const { getReplies } = usePost()
    const childComments = getReplies(id)
    console.log('childComments', childComments)
    return (
        <>
        <div className="comment">
            <div className="header">
            <span className="name">{user.name}</span>
            <span className="date">
                DATE
            </span>
            </div>
            <div className="bg-green-200">{message}</div>
            {childComments && childComments.length > 0 && <div className='ml-2 bg-orange-200'>{CommentList({comments:childComments})}</div> }

        </div>
        </>
    )
 }