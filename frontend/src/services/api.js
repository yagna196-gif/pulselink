import axios from "axios"

const api = axios.create({
  baseURL: "https://pulselink-1.onrender.com"
})

export default api