import React, { useCallback, useContext, useMemo, useState } from "react"
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"
import { useFormContext } from "react-hook-form"
import { Button } from "../Button"
import { Separator } from "../Separator"
import { FormError } from "../FormError"
import { PokemonsPicker } from "../PokemonsPicker"
import { TeamsApi } from "../../../services/firestore"
import { NavigationContext, NavigationRouteContext } from "@react-navigation/native"
import { selectUser } from "../../../redux/features/authSlice"
import { selectRegionsData } from "../../../redux/features/regionsSlice"

export const PokemonsStep = () => {
    const navigation = useContext(NavigationContext)
    const teamId = useContext(NavigationRouteContext).params?.id || null
    const userId = useSelector(selectUser).id
    const regions = useSelector(selectRegionsData)
    const [submitting, setSubmitting] = useState(false)
    const { handleSubmit, formState: { errors } } = useFormContext()
    const disableSubmit = useMemo(() => !!Object.keys(errors).length || submitting, [errors, submitting])


    const onSuccess = useCallback(async (data) => {
        try {
            setSubmitting(true)

            delete data.id
            data.user = userId
            data.pokemons = data.pokemons.filter(p => p?.id != null)
            data.region = regions.results.find(r => r.id === data.region_id)
            delete data.region_id
            
            if (teamId) {
                await TeamsApi.update(teamId, data)
            } else {
                await TeamsApi.store(data)
            }

            navigation.navigate("Teams")
        } catch (error) {
            setSubmitting(false)
        }
    }, [teamId, userId, regions.results.length])
    
    return (
        <View style={styles.container}>
            <PokemonsPicker name="pokemons" />
            <FormError error={errors.pokemons?.message} />
            <Separator />
            <Button title="Create" onPress={handleSubmit(onSuccess)} disabled={disableSubmit} />
            <Separator />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})