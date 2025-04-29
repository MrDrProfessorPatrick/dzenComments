import { makeRequest } from "./makeRequest"

export function createComment({ postId, message, parentId }) {
    return makeRequest(`posts/${postId}/createcomment`, {
      method: "POST",
      data: { message, parentId },
    })
  }