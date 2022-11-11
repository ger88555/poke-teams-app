import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Colors } from "../../../constants"

export const Label = ({ children }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{children}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        width: "100%",
        flexDirection: "row",
        marginBottom: 2,
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: Colors.secondary,
    }
})