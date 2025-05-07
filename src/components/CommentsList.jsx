import Comment from "./Comment";

export default function CommentList({ comments, setShowBigImage }) {
  return (
    comments &&
    comments.length &&
    comments.map((comment) => (
      <div
        key={comment.id}
        className={`m-5 ${comment.parentId === null ? "border bg-blue-300" : ""}`}
      >
        <Comment
          id={comment.id}
          user={comment.user}
          message={comment.message}
          image={comment.fileUrl}
          time={comment.createdAt}
          setShowBigImage={setShowBigImage}
        />
      </div>
    ))
  );
}
