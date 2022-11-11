import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Colors } from "../../../constants"

export const Label = ({ children }) => {
    if (!children) {
        return null
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.text}>{children}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
    },
    innerContainer: {
        backgroundColor: Colors.blackTransparent,
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "capitalize",
        textAlign: "center",
        color: Colors.secondary,
    }
})