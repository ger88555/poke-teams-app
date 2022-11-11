import React from "react"
import { StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { Button, FormError, Screen, Separator } from "../../common"
import { useFacebookSignIn, useGoogleSignIn } from "../../../hooks"
import { selectError } from "../../../redux/reducers/authSlice"

export const Login = () => {
    const error = useSelector(selectError)

    const [isFacebookReady, facebookSignInAsync] = useFacebookSignIn()
    const [isGoogleReady, googleSignInAsync] = useGoogleSignIn()
    
    return (
        <Screen scrollable={false} style={styles.screen}>
            <Button title="Google Sign In" onPress={() => { googleSignInAsync() }} disabled={!isGoogleReady} />
            <Separator />
            <Button title="Facebook Sign In" onPress={() => { facebookSignInAsync() }} disabled={!isFacebookReady} />
            <Separator />
            <FormError error={error} />
        </Screen>
    )
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: "center",
    },
})