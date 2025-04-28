import { makeRequest } from "./makeRequest";

export function getPosts() {
  return makeRequest("/api/getposts")
}

export function getPostById(id) {
  return makeRequest(`/api/getposts/${id}`)
}
