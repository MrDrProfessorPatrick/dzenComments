import { makeRequest } from "./makeRequest"

export function createComment({ message }) {
    return makeRequest(`/api/createcomment`, {
      method: "POST",
      data: { message },
    })
  }