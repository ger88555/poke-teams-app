import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./db"

export class UsersApi {

    static async store(info){
        return await addDoc(collection(db, "users"), info)
    }

    /**
     * @param {Object} info User info
     * @returns {Promise<String>} ID of the user
     */
    static async getOrStore(info){
        const usersRef = collection(db, "users")

        const q = query(usersRef, 
            where("email", "==", info.email), 
            where("providerId", "==", info.providerId)
        )

        const matches = await getDocs(q)
        
        if (matches.empty) {
            return (await this.store(info)).id
        }

        return matches.docs[0].id
    }
}