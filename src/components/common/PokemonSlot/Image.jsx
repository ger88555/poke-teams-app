import React from "react"
import { StyleSheet, View, Image as BaseImage } from "react-native"
import { Fontisto } from "@expo/vector-icons"
import { Colors } from "../../../constants"

export const Image = ({ uri = null }) => (
    <View style={styles.container}>
        {uri === null ? (
            <Fontisto name="question" color={Colors.secondary} />
        ) : (
            <BaseImage source={{ uri }} style={styles.photo} />
        )}
    </View>
)

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    photo: {
        flexGrow: 1,
        resizeMode: "cover",
        aspectRatio: 1,
    },
})