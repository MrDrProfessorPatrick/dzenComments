import React, { useContext, useEffect, useMemo, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useParams } from "react-router-dom";
import { useAsync } from "./useAsync.js";
import { getPostById } from "../services/posts.js";

const Context = React.createContext();

export function usePost() {
  return useContext(Context);
}

export function PostProvider({ children }) {
  const { id } = useParams();
  const { loading, error, value: post } = useAsync(() => getPostById(id), [id]);
  const { sendMessage, sendJsonMessage, lastMessage, readyState } = useWebSocket("ws://localhost:3000/ws");
  const [comments, setComments] = useState([]);
  const commentsByParentId = useMemo(() => {
    const group = {};
    comments.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [comments]);

  useEffect(() => {
    if (post?.comments == null) return;
    setComments(post.comments);
  }, [post?.comments]);

  useEffect(() => {
    lastMessage &&
      lastMessage.data.text().then((text) => {
        const newComment = JSON.parse(text);
        setComments((prevComments) => [newComment, ...prevComments]);
      });
  }, [lastMessage]);

  useEffect(() => sendMessage('{"type":"connection"}'), []);

  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }

  function createLocalComment(comment) {
    setComments((prevComments) => {
      return [comment, ...prevComments];
    });
  }

  function updateLocalComment(id, message) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, message };
        } else {
          return comment;
        }
      });
    });
  }

  function deleteLocalComment(id) {
    setComments((prevComments) => {
      return prevComments.filter((comment) => comment.id !== id);
    });
  }

  function toggleLocalCommentLike(id, addLike) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (id === comment.id) {
          if (addLike) {
            return {
              ...comment,
              likeCount: comment.likeCount + 1,
              likedByMe: true,
            };
          } else {
            return {
              ...comment,
              likeCount: comment.likeCount - 1,
              likedByMe: false,
            };
          }
        } else {
          return comment;
        }
      });
    });
  }
  return (
    <Context.Provider
      value={{
        post: { id, ...post },
        rootComments: commentsByParentId[null],
        getReplies,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        toggleLocalCommentLike,
        sendJsonMessage,
      }}
    >
      {loading ? <h1>Loading</h1> : error ? <h1>{error}</h1> : children}
    </Context.Provider>
  );
}
