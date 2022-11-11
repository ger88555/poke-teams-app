import React, { useCallback, useState } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Label } from "./Label"
import { Image } from "./Image"
import { List } from "./List"

/**
 * @typedef Pokemon
 * @property {String} id Unique identifier of the pokemon
 * @property {String} name Name of the pokemon
 */

/**
 * @param {Object} props
 * @param {Pokemon?} props.value Selected Pokemon
 */
const Slot = ({ value = null, onChange = () => {}, disabled = false }) => {
    const [selecting, setSelecting] = useState(false)
    
    const pressHandler = useCallback(() => {
        setSelecting(true)
    }, [])

    const selectHandler = useCallback((value) => {
        onChange(value)
        setSelecting(false)
    }, [onChange])

    return (
        <>
            <TouchableOpacity style={styles.container} onPress={pressHandler} activeOpacity={0.9} disabled={disabled}>
                <Image uri={value?.id} />
                <Label>{value?.name}</Label>
            </TouchableOpacity>
            {selecting && (<List selected={value} onSelect={selectHandler} onClose={() => setSelecting(false)} />)}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "50%",
        aspectRatio: 1,
        flexDirection: "column",
    },
})

const MemoizedSlot = React.memo(Slot)

export { MemoizedSlot as PokemonSlot }