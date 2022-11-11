import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { StyleSheet, View } from "react-native"
import { useFormContext } from "react-hook-form"
import { Button } from "../Button"
import { Separator } from "../Separator"
import { useDispatch, useSelector } from "react-redux"
import { fetchPokemons, selectPokemonsData } from "../../../redux/reducers/pokemonsSlice"
import { FormError } from "../FormError"
import { PokemonsPicker } from "../PokemonsPicker"
import { TeamsApi } from "../../../services/firestore"
import { NavigationContext } from "@react-navigation/native"
import { selectUser } from "../../../redux/reducers/authSlice"
import { selectRegionsData } from "../../../redux/reducers/regionsSlice"

export const PokemonsStep = () => {
    const navigation = useContext(NavigationContext)
    const [submitting, setSubmitting] = useState(false)
    const dispatch = useDispatch()
    const { id : userId } = useSelector(selectUser)
    const pokemons = useSelector(selectPokemonsData)
    const regions = useSelector(selectRegionsData)
    const { handleSubmit, formState: { errors } } = useFormContext()
    const disableSubmit = useMemo(() => !!Object.keys(errors).length || submitting, [errors, submitting])

    useEffect(() => {
        if (!pokemons.count) {
            dispatch(fetchPokemons())
        }
    }, [])

    const onSuccess = useCallback(async (data) => {
        try {
            setSubmitting(true)

            data.pokemons = data.pokemons.filter(p => p.id != null)
            data.region = regions.results.find(r => r.id === data.region_id)
            delete data.region_id
            data.user = userId
    
            await TeamsApi.store(data)

            navigation.navigate("Teams")
        } catch (error) {
            setSubmitting(false)
        }
    }, [userId, regions.results.length])

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