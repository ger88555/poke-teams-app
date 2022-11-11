import { StyleSheet } from "react-native"
import { Colors, Measures } from "../../../constants"

export const inputStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.secondary,
        paddingVertical: Measures.input.insetY,
        paddingHorizontal: Measures.input.insetX,
        marginBottom: Measures.input.offsetBottom,
    },
    text: {
        fontSize: 16,
        color: Colors.accent,
    },
})