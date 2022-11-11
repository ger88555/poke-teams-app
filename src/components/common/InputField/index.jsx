import React from "react"
import { StyleSheet, View } from "react-native"
import { Label } from "./Label"
import { TextInput } from "./TextInput"
import { PickerInput } from "./PickerInput"

export const InputField = ({ label = "", value = "", items = null, onChange = () => {}, onBlur = () => {}, disabled = false }) => {
    const baseProps = { value, onChange, onBlur, disabled }

    return (
        <View style={styles.container}>
            <Label>{label}</Label>
            {items === null ? (
                <TextInput {...baseProps} />
            ) : (
                <PickerInput {...baseProps} items={items} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
    },
})