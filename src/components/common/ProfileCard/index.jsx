import React from "react"
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"
import { Colors, Measures } from "../../../constants"
import { selectUser } from "../../../redux/features/authSlice"
import { Name } from "./Name"
import { Photo } from "./Photo"

export const ProfileCard = () => {
    const user = useSelector(selectUser)

    return (
        <View style={styles.container}>
            <Photo uri={user.photoURL} />
            <Name value={user.displayName} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingVertical: Measures.card.insetY,
        paddingHorizontal: Measures.card.insetX,
        backgroundColor: Colors.secondary,
    },
})