import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 15000,
})

export const carsApi = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com",
  timeout: 15000,
})

export default api