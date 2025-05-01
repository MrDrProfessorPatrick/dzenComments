
import AddCommentForm from "./AddCommentForm"
import CommentsList from "./CommentsList"

import { usePost } from "../hooks/PostContext"
import { useAsyncFn } from "../hooks/useAsync"
import { createComment } from "../services/comments";


export default function Post() {

  const { post, rootComments, createLocalComment } = usePost()

  const { loading, error, execute: createCommentFn } = useAsyncFn(createComment)

  function handleCommentCreate(message) {
    console.log('handleCommentCreate')
    createCommentFn({message}).then((comment) => console.log('comment', comment))
  }

  return (
    <>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <h3 className="comments-title">Comments</h3>
      <section>
        <AddCommentForm postId={post.id} submitComment={handleCommentCreate}/>
        {rootComments != null && rootComments.length > 0 && (
          <div className="mt-4">
            <CommentsList comments={rootComments} postId={post.id} submitComment={handleCommentCreate}/>
          </div>
        )}
      </section>
    </>
  )
}