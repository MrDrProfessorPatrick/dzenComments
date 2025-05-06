import Comment from "./Comment";

export default function CommentList({ comments }) {
  console.log("comments", comments);
  return comments.map((comment) => (
    <div
      key={comment.id}
      className={`comment-stack m-5 ${comment.parentId === null ? "border" : ""}`}
    >
      <Comment
        id={comment.id}
        user={comment.user}
        message={comment.message}
        image={comment.fileUrl}
        time={comment.createdAt}
      />
    </div>
  ));
}
