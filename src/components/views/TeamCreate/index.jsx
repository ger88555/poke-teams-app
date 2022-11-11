import React from "react"
import { StyleSheet } from "react-native"
import { Screen, TeamForm } from "../../common"

export const TeamCreate = () => (
    <Screen scrollable={false} style={styles.screen}>
        <TeamForm />
    </Screen>
)

const styles = StyleSheet.create({
    screen: {
        width: "100%",
        paddingHorizontal: 0,
        paddingTop: 0,
    }
})