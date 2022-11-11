import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Colors } from "../../../constants"
import { Name } from "./Name"
import { Pokemons } from "./Pokemons"
import { Region } from "./Region"

const ListItem = ({ name, region, pokemons, onPress = () => {} }) => (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
        <Name>{name}</Name>
        <Region>{region.name}</Region>
        <Pokemons>{pokemons}</Pokemons>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        padding: 8,
        marginBottom: 4,
        backgroundColor: Colors.secondary,
    },
})

const MemoizedListItem = React.memo(ListItem)

export { MemoizedListItem as TeamListItem }