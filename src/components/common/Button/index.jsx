import React from "react"
import { StyleSheet, TouchableOpacity, Text } from "react-native"
import { Colors, Measures } from "../../../constants"

export const Button = ({ title = "", onPress = () => {}, disabled = false }) => {

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled} activeOpacity={0.9}>
            <Text style={styles.text} adjustFontSizeToFit>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: Measures.button.insetY,
        paddingHorizontal: Measures.button.insetX,
        backgroundColor: Colors.lightSecondary,
    },
    text: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: Colors.accent,
    }
})