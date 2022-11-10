import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Colors } from "../../../constants"

export const Name = ({ value }) => (
    <View style={styles.container}>
        <Text style={styles.text} adjustsFontSizeToFit numberOfLines={2}>{value}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
        paddingStart: "5%"
    },
    text: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.accent,
    }
})