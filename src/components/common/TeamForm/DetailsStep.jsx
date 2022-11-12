import React, { useCallback, useEffect, useMemo } from "react"
import { StyleSheet, ScrollView } from "react-native"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Button } from "../Button"
import { Separator } from "../Separator"
import { FormError } from "../FormError"
import { InputField } from "../InputField"
import { fetchRegions, selectRegionsData, selectRegionsLoading } from "../../../redux/reducers/regionsSlice"
import { useDispatch, useSelector } from "react-redux"
import { Regions, Validation } from "../../../constants"
import { setPokemonsRegion } from "../../../redux/reducers/pokemonsSlice"

export const DetailsStep = ({ jumpTo }) => {
    const dispatch = useDispatch()
    const regions = useSelector(selectRegionsData)
    const regionsLoading = useSelector(selectRegionsLoading)
    const { control, formState: { errors, defaultValues } } = useFormContext()
    const region_id = useWatch({ name: "region_id", control })
    const initialRegion = defaultValues?.region_id

    useEffect(() => {
        if (!regions.count) {
            dispatch(fetchRegions())
        }
    }, [])

    useEffect(() => {
        if (errors?.name?.message || errors?.region_id?.message) {
            jumpTo("details")
        }
    }, [errors?.name?.message, errors?.region_id?.message])

    const displayRegions = useMemo(() => {
        return regions.results.map(r => {
            const display = Object.assign({}, r)

            // Don't count usage by the team under edition
            if (r.id == initialRegion && r.usage > 0) display.usage--

            // Discard filled regions
            if (Regions.maxTeams == display.usage) return undefined

            // Display region usage
            display.name += ` (${Regions.maxTeams - display.usage} team(s) left)`

            return display
        }).filter(v => v)
    }, [regions.count, initialRegion])

    /**
     * Sync Pokemons region filter
     * with selected team region
     */
    useEffect(() => {
        if (region_id) {
            dispatch(setPokemonsRegion(region_id))
        }
    }, [region_id])
    
    const nextPressedHandler = useCallback(() => {
        jumpTo("pokemons")
    }, [jumpTo])

    return (
        <>
            <ScrollView style={styles.container}>
                <Controller
                    control={control}
                    rules={{
                        required: Validation.required("name"),
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField label="name" onChange={onChange} onBlur={onBlur} value={value} />
                    )}
                    name="name"
                />
                <FormError error={errors.name?.message} />
                <Controller
                    control={control}
                    rules={{
                        required: Validation.required("region"),
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField label="region" onChange={onChange} onBlur={onBlur} value={value} items={displayRegions} loading={regionsLoading} />
                    )}
                    name="region_id"
                />
                <FormError error={errors.region_id?.message} />
            </ScrollView>
            <Separator />
            <Button title="Pick Pokemons!" onPress={nextPressedHandler} />
            <Separator />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})