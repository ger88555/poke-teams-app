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
        paddingTop: Measures.screen.insetTop,
        paddingHorizontal: Measures.screen.insetX,
        backgroundColor: Colors.negative,
        minHeight: "100%",
    },
    scrollable: {
        flex: 0,
    }
})