import React, { useState, useEffect } from "react";
import AddCommentForm from "./AddCommentForm";
import CommentsList from "./CommentsList";

import { usePost } from "../hooks/PostContext";
import { useAsyncFn } from "../hooks/useAsync";
import { createComment } from "../services/comments";

export default function Post() {
  const COMMENTS_PER_PAGE = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const { post, rootComments, sendJsonMessage } = usePost();
  const [sortedByDate, setSortedByDate] = useState(false);
  const [sortedComments, setSortedComments] = useState(rootComments);
  const [paginatedRootComments, setPaginatedRootComments] = useState([])
  let commentsLength = rootComments && rootComments.length > 0 ? rootComments.length : 0;
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

  useEffect(()=>{
    const paginatedRootComments = sortedComments && sortedComments.slice(
      (currentPage - 1) * COMMENTS_PER_PAGE,
      currentPage * COMMENTS_PER_PAGE
    );
    setPaginatedRootComments(paginatedRootComments)
  },[sortedComments, currentPage]);
  
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
              comments={paginatedRootComments}
              postId={post.id}
              submitComment={handleCommentCreate}
            />
          </div>
        )}
      </section>
      <div className="flex justify-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="mx-2">{currentPage}</span>
      <button
        disabled={currentPage * COMMENTS_PER_PAGE >= commentsLength}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
</div>
    </>
  );
}
