import { collection, doc, addDoc, getDocs, getDoc, query, limit, startAt, where, orderBy } from "firebase/firestore"
import { db } from "./db"

export class TeamsApi {

    static async store(info){
        return await addDoc(collection(db, "teams"), info)
    }
}