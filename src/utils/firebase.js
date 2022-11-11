import { initializeApp } from "firebase/app"
import { Firebase } from "../constants"

export const initFirebase = () => {
    return initializeApp(Firebase.config)
}