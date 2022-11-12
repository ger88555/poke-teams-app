import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Colors } from "../../../constants"

export const Region = ({ children }) => (
    <View style={styles.container}>
        <Text style={styles.name}>{children}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
    },
    name: {
        fontSize: 12,
        fontFamily: "Minecraft",
        color: Colors.lightAccent,
    },
})