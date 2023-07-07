import axios from "axios"

const api = axios.create({
  baseURL: "https://motorsshop-w0l3.onrender.com",
  timeout: 15000,
})

export const carsApi = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com",
  timeout: 15000,
})

export default api