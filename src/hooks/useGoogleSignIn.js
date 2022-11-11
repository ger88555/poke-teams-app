import { useEffect } from "react"
import { useDispatch } from "react-redux"
import * as Google from "expo-auth-session/providers/google"
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth"
import { login, setError } from "../redux/reducers/authSlice"
import { Firebase } from "../constants"
import { UsersApi } from "../services/firestore"

export const useGoogleSignIn = () => {
    const dispatch = useDispatch()

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: Firebase.clientIds.google
    })

    useEffect(() => {
        if (response?.type === "success") {
            // get Google credentials
            const { id_token } = response.params
            const credential = GoogleAuthProvider.credential(id_token)

            // sign in to Firebase with the Google credentials
            signInWithCredential(getAuth(), credential)
                .then(async ({ user, providerId }) => {
                    const { email, photoURL, displayName } = user

                    // get the database identifier for this user
                    const dbUser = { email, displayName, providerId }
                    const id = await UsersApi.getOrStore(dbUser)

                    dispatch(login({
                        user: { id, email, photoURL, displayName },
                        providerId,
                        token: id_token,
                    }))
                })
                .catch((e) => {
                    dispatch(setError(e.message))
                })
        }
    }, [response])

    return [request, promptAsync]
}