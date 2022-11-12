import React, { useMemo } from "react"
import { Picker } from "@react-native-picker/picker"
import { inputStyles } from "./styles"

export const PickerInput = ({ value = "", items = [], onChange = () => {}, onBlur = () => {}, disabled = false, loading = false }) => {
    const ItemComponents = useMemo(() => (
        loading 
            ? <Picker.Item value={value} label="LOADING..." style={inputStyles.text} />
            : items.map((i) => <Picker.Item key={i.id} value={i.id} label={i.name} style={inputStyles.text} />)
    ), [items.length, loading])

    return (
        <Picker
            style={[inputStyles.container, inputStyles.text]}
            useNativeAndroidPickerStyle={false}
            onBlur={onBlur}
            numberOfLines={1}
            selectedValue={value}
            onValueChange={onChange}
            disabled={disabled}
            itemStyle={inputStyles.text}
        >
            <Picker.Item label="SELECT" color="gray" style={inputStyles.text} />
            {ItemComponents}
        </Picker>
    )
}