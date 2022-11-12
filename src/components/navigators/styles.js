import { StyleSheet } from "react-native"
import { Colors, Measures } from "../../constants"

export const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.dominant,
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: "Minecraft",
        color: Colors.secondary,
    },
    tabBar: {
        height: Measures.tabBar.height,
        borderTopWidth: 8,
        borderTopColor: Colors.accent,
        backgroundColor: Colors.secondary,
    },
    tabBarLabel: {
        fontSize: 14,
        fontFamily: "Minecraft",
        paddingBottom: 2,
    }
})