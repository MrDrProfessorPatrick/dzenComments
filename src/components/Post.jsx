import React, { useState, useEffect } from "react";
import AddCommentForm from "./AddCommentForm";
import CommentsList from "./CommentsList";

import { usePost } from "../hooks/PostContext";
import { useAsyncFn } from "../hooks/useAsync";
import { createComment } from "../services/comments";

export default function Post() {
  const { post, rootComments, sendJsonMessage } = usePost();
  const [sortedByDate, setSortedByDate] = useState(false);
  const [sortedComments, setSortedComments] = useState(rootComments);

  const {
    loading,
    error,
    execute: createCommentFn,
  } = useAsyncFn(createComment);

  function handleCommentCreate(message) {
    createCommentFn({ message }).then((comment) =>
      console.log("comment", comment)
    );
  }

  useEffect(() => {
    const sortedComments =
      sortedByDate && rootComments && rootComments.length > 0
        ? [...rootComments].sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
          })
        : rootComments;
    setSortedComments(sortedComments);
  }, [rootComments, sortedByDate]);

  return (
    <>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <h3 className="comments-title">Comments</h3>
      <section>
        <AddCommentForm postId={post.id} sendJsonMessage={sendJsonMessage} />
        {rootComments != null && rootComments.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-end mb-2 mr-6">
              <button
                onClick={() => setSortedByDate((prev) => !prev)}
                className="mb-2 p-2 bg-blue-500 text-white rounded"
              >
                {sortedByDate ? "Oldest first" : "Newest first"}
              </button>
            </div>

            <CommentsList
              comments={sortedComments}
              postId={post.id}
              submitComment={handleCommentCreate}
            />
          </div>
        )}
      </section>
    </>
  );
}
