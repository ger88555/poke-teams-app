import React from "react"
import { StyleSheet, View, ActivityIndicator} from "react-native"
import { Colors } from "../../../constants"

export const LoadingIndicator = () => (
    <View scrollable={false} style={styles.container}>
        <ActivityIndicator size="large" color={Colors.secondary} />
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    }
})