import { getFirestore } from "firebase/firestore"
import { initFirebase } from "../../utils"

export const db = getFirestore(initFirebase())