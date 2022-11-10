import { initializeApp } from "firebase/app"
import { Firebase } from "../constants"

export const initFirebase = () => {
    initializeApp(Firebase.config)
}