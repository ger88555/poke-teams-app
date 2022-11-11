import React from "react"
import { StyleSheet, View, Image } from "react-native"
import { Colors } from "../../../constants"

export const Photo = ({ uri }) => (
    <View style={styles.container}>
        <Image source={{ uri }} style={styles.photo} />
    </View>
)

const styles = StyleSheet.create({
    container: {
        width: "30%",
        flexDirection: "column",
        justifyContent: "center",
    },
    photo: {
        flex: 1,
        resizeMode: "cover",
        aspectRatio: 1,
        borderWidth: 4,
        borderRadius: 1000,
        borderColor: Colors.accent,
    },
})