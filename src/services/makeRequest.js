import axios from "axios"

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: false,
})

export function makeRequest(url, options) {
  return axiosPrivate(url, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
}
