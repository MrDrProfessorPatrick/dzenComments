import axios from "axios";
import { makeRequest } from "./makeRequest";

export function getPosts() {
  return axios.get("/api/getposts")
    .then(res => res.data)
    .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
  // return makeRequest("/api/getposts")
}

export function getPostById(id) {
  return makeRequest(`/api/getposts/${id}`)
}
