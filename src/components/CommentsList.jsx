import Comment from "./Comment"

export default function CommentList({ comments }) {
  return comments.map(comment => (
    <div key={comment.id} className="comment-stack">
        <Comment id={comment.id} user={comment.user} message ={comment.message}  /> 
    </div>
  ))
}
