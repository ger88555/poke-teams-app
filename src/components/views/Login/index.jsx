import React from "react"
import { StyleSheet } from "react-native"
import { connect } from "react-redux"
import { Button, Screen } from "../../common"

const Login = () => {
    return (
        <Screen scrollable={false} style={styles.screen}>
            <Button title="Entrar" />
        </Screen>
    )
}

const ConnectedLogin = connect(null)(Login)

const styles = StyleSheet.create({
    screen: {
        justifyContent: "center",
    }
})

export { ConnectedLogin as Login }