import React, { useCallback, useEffect } from "react"
import { StyleSheet, ScrollView } from "react-native"
import { PokemonSlot } from "../PokemonSlot"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import { Validation } from "../../../constants"
import { useDispatch, useSelector } from "react-redux"
import { fetchPokemons, selectPokemonsRegionId } from "../../../redux/features/pokemonsSlice"

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
 * @param {Number} props.min Minimum required Pokemons
 * @param {Number} props.max Maximum Pomemons
 */
export const PokemonsPicker = ({ name = "pokemons", min = 3, max = 6 }) => {
    const dispatch = useDispatch()
    const selectedRegion = useSelector(selectPokemonsRegionId)

    const { control, formState: { defaultValues } } = useFormContext()
    const initialRegion = defaultValues?.region_id

    const validate = useCallback((v) => {
        const picked = v.filter(i => i?.id != null).length

        return (picked >= min) || Validation.min("Pokemons", min)
    }, [min])

    const { fields, update } = useFieldArray({ control, name, rules: { validate }, shouldUnregister: true })

    /**
     * Sync pokemons list with selected region
     * and clear slots on region mismatch
     */
    useEffect(() => {
        if (selectedRegion) {
            dispatch(fetchPokemons())
        }

        if (!selectedRegion || initialRegion != selectedRegion) {
            clearSlots()
        }
    }, [initialRegion, selectedRegion])

    /**
     * Sync slot count with `max`
     */
    useEffect(() => {
        if (fields.length && fields.length === max) {
            return
        }

        const emptySlots = max - fields.length

        clearSlots(fields.length-1 + emptySlots)
    }, [max])

    const clearSlots = useCallback((start = 0) => {
        for (let i = start; i < max; i++) {
            update(i, DEFAULT_SLOT)
        }
    }, [max])

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
                            disabled={!selectedRegion}
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