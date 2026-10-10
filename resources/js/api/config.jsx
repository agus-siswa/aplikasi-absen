import axios from "axios"

export const BASE_URL = "http://127.0.0.1:8000"

export const request = () => axios.create({
    baseURL: BASE_URL,
    headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
})
