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
        paddingVertical: 2,
    },
    text: {
        fontSize: 14,
        fontFamily: "Minecraft",
        textTransform: "capitalize",
        textAlign: "center",
        color: Colors.secondary,
    }
})