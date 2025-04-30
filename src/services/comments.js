import { makeRequest } from "./makeRequest"

export function createComment({ postId, message, parentId }) {
    return makeRequest(`/api/createcomment/${postId}`, {
      method: "POST",
      data: { message, parentId },
    })
  }