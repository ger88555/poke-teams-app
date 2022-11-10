import { DefaultTheme } from "@react-navigation/native"
import { Colors } from "./colors"

/** @type {import("@react-navigation/native").Theme} */
export const NavigationTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        text: Colors.secondary,
    }
}