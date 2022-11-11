import React, { useCallback, useEffect } from "react"
import { StyleSheet, ScrollView } from "react-native"
import { Controller, useFormContext } from "react-hook-form"
import { Button } from "../Button"
import { Separator } from "../Separator"
import { FormError } from "../FormError"
import { InputField } from "../InputField"
import { fetchRegions, selectRegionsData } from "../../../redux/reducers/regionsSlice"
import { useDispatch, useSelector } from "react-redux"
import { Validation } from "../../../constants"

export const DetailsStep = ({ jumpTo }) => {
    const dispatch = useDispatch()
    const regions = useSelector(selectRegionsData)
    const { control, formState: { errors } } = useFormContext()

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
                        <InputField label="region" onChange={onChange} onBlur={onBlur} value={value} items={regions.results} />
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