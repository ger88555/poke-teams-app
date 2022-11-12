import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Colors } from "../../../constants"

export const EmptyMessage = ({ name = "items" }) => (
    <View style={styles.container}>
        <Text style={styles.text}>There are no {name} to display!</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        fontFamily: "Minecraft",
        textAlign: "center",
        color: Colors.secondary,
    }
})