import { collection, doc, addDoc, getDocs, getDoc, query, limit, startAfter, where, orderBy, deleteDoc, setDoc, FieldPath, getCountFromServer } from "firebase/firestore"
import { db } from "./db"

export class TeamsApi {

    /**
     * @param {Object} params 
     * @param {?Number} limit
     * @param {?string} startAfter Get fields after the given team ID
     */
    static async list(params){  
        const constraints = [
            orderBy("name"),
            params.limit && limit(params.limit),
            params.startAfter && startAfter(doc(db, "teams", params.startAfter)),
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

    static async get(id){
        const data = await getDoc(doc(db, "teams", id))

        return {
            id: data.id,
            ...data.data()
        }
    }

    /**
     * @param {string} userId The teams' owner
     * @param {string[]} regions Region identifiers
     * @returns {Promise<Object.<string, Number>>} Team count per region identifier
     */
    static async getTeamsPerRegion(userId, regions = []){
        const result = {}
        const teamsRef = collection(db, "teams")
        const regionIdField = new FieldPath("region", "id")

        for (const id of regions) {
            const q = query(teamsRef, where("user", "==", userId), where(regionIdField, "==", id))

            result[id] = (await getCountFromServer(q)).data().count
        }
        
        return result
    }

    static async update(id, info){
        return await setDoc(doc(db, "teams", id), info)
    }

    static async delete(id){
        return await deleteDoc(doc(db, "teams", id))
    }
}