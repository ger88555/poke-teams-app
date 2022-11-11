import { collection, doc, addDoc, getDocs, getDoc, query, limit, startAt, where, orderBy } from "firebase/firestore"
import { db } from "./db"

export class TeamsApi {

    /**
     * @param {Object} params 
     * @param {?Number} limit
     * @param {?Number} offset
     */
    static async list(params){  
        const constraints = [
            orderBy("name"),
            params.limit && limit(params.limit),
            params.offset && startAt(params.offset),
            params.user && where("user", "==", params.user)
        ].filter(c => c)

        const q = query(collection(db, "teams"), ...constraints)

        const data = await getDocs(q)

        return data.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }))
    }

    static async store(info){
        return await addDoc(collection(db, "teams"), info)
    }
}