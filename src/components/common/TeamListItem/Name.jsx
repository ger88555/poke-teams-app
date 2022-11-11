import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Colors } from "../../../constants"

export const Name = ({ children }) => (
    <View style={styles.container}>
        <Text style={styles.name}>{children}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        paddingBottom: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.accent,
    },
})