import React from "react"
import { TextInput as BaseTextInput } from "react-native"
import { inputStyles } from "./styles"

export const TextInput = ({ value = "", onChange = () => {}, onBlur = () => {}, disabled = false }) => (
    <BaseTextInput
        style={[inputStyles.container, inputStyles.text]}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        editable={!disabled}
    />
)