import React from "react"
import { StyleSheet, TouchableOpacity, Text } from "react-native"
import { Colors, Measures } from "../../../constants"

export const Button = ({ title = "", onPress = () => {}, disabled = false }) => {

    return (
        <TouchableOpacity 
            onPress={onPress} 
            disabled={disabled} 
            activeOpacity={0.9}
            style={[styles.container, disabled && styles.disabledContainer]} 
        >
            <Text style={[styles.text, disabled && styles.disabledText]} adjustFontSizeToFit>{title}</Text>
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
    disabledContainer: {
        backgroundColor: Colors.secondary,
    },
    text: {
        textAlign: "center",
        fontFamily: "Pusab",
        fontSize: 14,
        textTransform: "uppercase",
        color: Colors.accent,
    },
    disabledText: {
        color: Colors.lightAccent,
    }
})