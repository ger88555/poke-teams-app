import React from "react"
import { StyleSheet } from "react-native"
import { TabBar as BaseTabBar } from "react-native-tab-view"
import { Colors } from "../../../constants"

/**
 * @param {import("react-native-tab-view").TabBarProps} props 
 */
export const TabBar = (props) => (
    <BaseTabBar 
        {...props}
        style={[props.style, styles.container]}
        indicatorStyle={[props.indicatorStyle, styles.indicator]}
        labelStyle={[props.labelStyle, styles.label]}
    />
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.dominant
    },
    indicator: {
        backgroundColor: Colors.lightSecondary,
    },
    label: {
        fontWeight: "bold"
    }
})