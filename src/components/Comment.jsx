import React, { useState } from "react";
import { usePost } from "../hooks/PostContext";
import { RiQuestionAnswerLine } from "react-icons/ri";
import DOMPurify from "dompurify";

import AddCommentForm from "./AddCommentForm";
import CommentList from "./CommentsList";

export default function Comment({
  id,
  user,
  message,
  image,
  time,
  setShowBigImage,
}) {
  const date = new Date(time);
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });

  const sanitizedHTML = DOMPurify.sanitize(message, {
    ALLOWED_TAGS: ["a", "code", "i", "strong"],
    ALLOWED_ATTR: ["href", "title", "target", "rel"],
  });

  const { getReplies, post, sendJsonMessage } = usePost();
  const childComments = getReplies(id);
  const [addCommentVisisble, showAddComment] = useState(false);

  return (
    <>
      <div className="comment ml-5 mr-5 mb-2 mt-2">
        <div className="flex justify-between">
          <span className="name">{user.name}</span>
          <button
            type="button"
            onClick={() => {
              showAddComment(!addCommentVisisble);
            }}
            className="cursor-pointer"
          >
            <RiQuestionAnswerLine />
          </button>
          <span className="ml-10 text-xs">{dateFormatter.format(date)}</span>
        </div>
        <div className="flex bg-green-200 p-2 rounded-md">
          {image && (
            <img
              src={`/uploads/${image}`}
              height="320px"
              width="240px"
              alt=""
              onClick={() => setShowBigImage(`/uploads/${image}`)}
            />
          )}
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            className="p-2"
          ></div>
        </div>
        {addCommentVisisble && (
          <AddCommentForm
            postId={post.id}
            parentId={id}
            sendJsonMessage={sendJsonMessage}
            showAddComment={showAddComment}
          />
        )}
        {childComments && childComments.length > 0 && (
          <div className="ml-2 bg-orange-200">
            {<CommentList comments={childComments} />}
          </div>
        )}
      </div>
    </>
  );
}
