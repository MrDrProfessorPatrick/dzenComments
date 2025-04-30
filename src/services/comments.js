import { makeRequest } from "./makeRequest"

export function createComment({ postId, message, parentId }) {
    return makeRequest(`/api/${postId}/createcomment`, {
      method: "POST",
      data: { message, parentId },
    })
  }