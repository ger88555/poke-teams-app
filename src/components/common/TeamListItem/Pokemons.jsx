import React from "react"
import { StyleSheet, View } from "react-native"
import { PokemonSlot } from "../PokemonSlot"

export const Pokemons = ({ children }) => (
    <View style={styles.container}>
        {children.map((v, i) => <PokemonSlot key={i} value={v} disabled small />)}
    </View>
)

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        marginRight: 4,
    },
})