import { useEffect } from "react"
import { useDispatch } from "react-redux"
import * as Google from "expo-auth-session/providers/google"
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth"
import { login, setError } from "../redux/reducers/authSlice"
import { Firebase } from "../constants"

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
                .then(({ user, providerId }) => {
                    const { email, photoURL, displayName } = user

                    dispatch(login({
                        user: { email, photoURL, displayName },
                        providerId,
                        token: id_token,
                    }))
                })
                .catch((e) => dispatch(setError(e.message)))
        }
    }, [response])

    return [request, promptAsync]
}