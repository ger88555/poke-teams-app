import React from "react"
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"
import { Colors, Measures } from "../../../constants"
import { selectTeamData } from "../../../redux/features/teamDetailsSlice"
import { Name } from "./Name"
import { Pokemons } from "./Pokemons"
import { Region } from "./Region"

export const TeamCard = () => {
    const team = useSelector(selectTeamData)

    return (
        <>
            <View style={styles.detailsContainer}>
                <Name>{team.name}</Name>
                <Region>{team.region.name}</Region>
            </View>
            <Pokemons>{team.pokemons}</Pokemons>
        </>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        flexShrink: 1,
        flexDirection: "column",
        paddingVertical: Measures.card.insetY,
        paddingHorizontal: Measures.card.insetX,
        backgroundColor: Colors.secondary,
    },
})