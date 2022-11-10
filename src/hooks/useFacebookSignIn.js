import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { makeRedirectUri, ResponseType } from "expo-auth-session"
import * as Facebook from "expo-auth-session/providers/facebook"
import { getAuth, FacebookAuthProvider, signInWithCredential } from "firebase/auth"
import { login, setError } from "../redux/reducers/authSlice"
import { Firebase } from "../constants"

export const useFacebookSignIn = () => {
    const dispatch = useDispatch()

    const [request, response, promptAsync] = Facebook.useAuthRequest({
        responseType: ResponseType.Token,
        clientId: Firebase.clientIds.facebook,
        redirectUri: makeRedirectUri({ useProxy: true })
    })

    useEffect(() => {
        if (response?.type === "success") {
            // get FB credentials
            const { access_token } = response.params
            const credential = FacebookAuthProvider.credential(access_token)

            // sign in to Firebase with the FB credentials
            signInWithCredential(getAuth(), credential)
                .then(({ user, providerId }) => {
                    const { email, photoURL, displayName } = user
                    dispatch(login({
                        user: { email, photoURL, displayName },
                        providerId,
                        token: access_token,
                    }))
                })
                .catch((e) => dispatch(setError(e.message)))
        }
    }, [response])

    return [request, promptAsync]
}