import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Colors, Measures } from "../../../constants"

export const FormError = ({ error = "" }) => {

    if (!error?.length) {
        return null
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text} adjustsFontSizeToFit numberOfLines={2}>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: Measures.error.insetY,
        paddingHorizontal: Measures.error.insetX,
        marginTop: Measures.error.offsetTop,
        backgroundColor: Colors.lightSecondary,
    },
    text: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: Colors.error,
    }
})