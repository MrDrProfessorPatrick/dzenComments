
import AddCommentForm from "./AddCommentForm"

export default function Post() {

  return (
    <>
      <h1>TITLE</h1>
      <article>BODY</article>
      <h3 className="comments-title">Comments</h3>
      <section>
        <AddCommentForm />
          <div className="mt-4">
            <CommentList comments={rootComments} />
          </div>
      </section>
    </>
  )
}