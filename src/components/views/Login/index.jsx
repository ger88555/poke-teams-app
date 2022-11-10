import React from "react"
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"
import { Button, FormError, Screen } from "../../common"
import { useFacebookSignIn, useGoogleSignIn } from "../../../hooks"
import { selectError } from "../../../redux/reducers/authSlice"
import { Measures } from "../../../constants"

export const Login = () => {
    const error = useSelector(selectError)

    const [isFacebookReady, facebookSignInAsync] = useFacebookSignIn()
    const [isGoogleReady, googleSignInAsync] = useGoogleSignIn()
    
    return (
        <Screen scrollable={false} style={styles.screen}>
            <Button title="Google Sign In" onPress={() => { googleSignInAsync() }} disabled={!isGoogleReady} />
            <View style={styles.separator} />
            <Button title="Facebook Sign In" onPress={() => { facebookSignInAsync() }} disabled={!isFacebookReady} />
            <FormError error={error} />
        </Screen>
    )
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: "center",
    },
    separator: {
        height: Measures.separator.vertical
    }
})