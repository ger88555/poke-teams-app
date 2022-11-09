import React from "react"
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native"
import { Colors, Measures } from "../../../constants"

export const Screen = ({ children, style = {}, contentContainerStyle = {}, scrollable = true }) => {
    return (
        <SafeAreaView style={styles.outerContainer}>
            {scrollable ? (
                <ScrollView style={style} contentContainerStyle={[styles.innerContainer, styles.scrollable, contentContainerStyle]}>
                    {children}
                </ScrollView>
            ) : (
                <View style={[styles.innerContainer, style]}>
                    {children}
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: Colors.dominant
    },
    innerContainer: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: Measures.screen.offsetTop,
        paddingHorizontal: Measures.screen.offsetX,
        backgroundColor: Colors.negative,
    },
    scrollable: {
        flex: 0,
    }
})