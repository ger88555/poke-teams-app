import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Label } from "./Label"
import { Image } from "./Image"
import { Picker } from "./Picker"
import { PokemonsApi } from "../../../services/pokeapi"

/**
 * @typedef Pokemon
 * @property {String} id Unique identifier of the pokemon
 * @property {String} name Name of the pokemon
 */

/**
 * @param {Object} props
 * @param {Pokemon?} props.value Selected Pokemon
 */
const Slot = ({ value = null, onChange = () => {}, disabled = false, small = false }) => {
    const [selecting, setSelecting] = useState(false)
    const [image, setImage] = useState(null)
    
    const pressHandler = useCallback(() => {
        setSelecting(true)
    }, [])

    const selectHandler = useCallback((value) => {
        onChange(value)
        setSelecting(false)
    }, [onChange])


    useEffect(() => {
        if (value?.id) {
            loadImage(value.id)
        } else {
            setImage(null)
        }
    }, [value])

    const loadImage = useCallback(async (id) => {
        const { sprites } = await PokemonsApi.get(id)

        setImage(sprites.front_default)
    }, [])

    return (
        <>
            <TouchableOpacity style={[styles.container, small && styles.smallContainer]} onPress={pressHandler} activeOpacity={0.9} disabled={disabled}>
                <Image uri={image} />
                {small || <Label>{value?.name}</Label>}
            </TouchableOpacity>
            {selecting && (<Picker selected={value} onSelect={selectHandler} onClose={() => setSelecting(false)} />)}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "50%",
        aspectRatio: 1,
        flexDirection: "column",
    },
    smallContainer: {
        width: "25%",
    },
})

const MemoizedSlot = React.memo(Slot)

export { MemoizedSlot as PokemonSlot }