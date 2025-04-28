import Comment from "./Comment"

export default function CommentList({ comments }) {
  console.log('comments', comments)
  return comments.map(comment => (
    <div key={comment.id} className="comment-stack">
        <Comment {...comment} /> 
    </div>
  ))
}
