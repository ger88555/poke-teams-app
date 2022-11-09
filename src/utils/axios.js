import axios from "axios"
import { API_URL } from "../constants/api"

export const initAxios = () => {
    axios.defaults.baseURL = API_URL
    axios.defaults.headers.common["Content-Type"]  = "application/json"
}

export const setAxiosAuthentication = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token
    } else {
        delete axios.defaults.headers.common["Authorization"]
    }
}