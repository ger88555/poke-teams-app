import React from "react"
import { StyleSheet, View } from "react-native"
import { Measures } from "../../../constants"

export const Separator = () => (
    <View style={styles.separator} />
)

const styles = StyleSheet.create({
    separator: {
        height: Measures.separator
    }
})