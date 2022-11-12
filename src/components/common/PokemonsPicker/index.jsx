import React, { useCallback, useEffect } from "react"
import { StyleSheet, ScrollView } from "react-native"
import { PokemonSlot } from "../PokemonSlot"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import { Validation } from "../../../constants"
import { useDispatch, useSelector } from "react-redux"
import { fetchPokemons, selectPokemonsRegionId } from "../../../redux/reducers/pokemonsSlice"

/**
 * @typedef Pokemon
 * @property {String} id Unique identifier of the pokemon
 * @property {String} name Name of the pokemon
 */

/** @type {Pokemon} */
const DEFAULT_SLOT = { id: null, name: null }

/**
 * @param {Object} props
 * @param {String} props.name Form field name (default: "pokemons")
 * @param {Pokemon[]} props.value Selected Pokemons
 */
export const PokemonsPicker = ({ name = "pokemons", disabled = false, min = 3, max = 6 }) => {
    const dispatch = useDispatch()
    const selectedRegion = useSelector(selectPokemonsRegionId)

    const { control, formState: { defaultValues } } = useFormContext()
    const initialRegion = defaultValues?.region_id

    const validate = useCallback((v) => {
        const picked = v.filter(i => i.id != null).length

        return (picked >= min) || Validation.min("Pokemons", min)
    }, [min])

    const { fields, append, update } = useFieldArray({ control, name, rules: { validate } })

    /**
     * Sync pokemons list with selected region
     * and clear slots on region mismatch
     */
    useEffect(() => {
        if (selectedRegion) {
            dispatch(fetchPokemons())
        }

        if (initialRegion != selectedRegion) {
            clearSlots()
        }
    }, [initialRegion, selectedRegion])

    /**
     * Sync slot count with `max`
     */
    useEffect(() => {
        if (fields.length === max) {
            return
        }

        const emptySlots = max - fields.length
        
        for (let i = 0; i < emptySlots; i++) {
            append(DEFAULT_SLOT, { shouldFocus: false })
        }
    }, [max])

    const clearSlots = useCallback(() => {
        for (let i = 0; i < max; i++) {
            update(i, DEFAULT_SLOT)
        }
    }, [max])

    if (fields.length != max) {
        return <ScrollView style={styles.container} />
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {fields.map((item, i) => (
                <Controller
                    key={item.id}
                    render={({ field: { onChange, value, name } }) => (
                        <PokemonSlot
                            name={name}
                            value={value}
                            onChange={onChange}
                            disabled={disabled}
                        />
                    )}
                    name={`${name}.${i}`}
                    control={control}
                />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
})