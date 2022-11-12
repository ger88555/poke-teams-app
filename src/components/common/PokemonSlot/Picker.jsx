import React, { useCallback } from "react"
import { StyleSheet, View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Colors } from "../../../constants"
import { Modal } from "../Modal"
import { List as BaseList } from "../List"
import { fetchMorePokemons, fetchPokemons, selectPokemonsData, selectPokemonsLoading, selectPokemonsLoadingMore } from "../../../redux/features/pokemonsSlice"
import { PickerItem } from "./PickerItem"

/**
 * @typedef Pokemon
 * @property {String} id Unique identifier of the pokemon
 * @property {String} name Name of the pokemon
 */

/**
 * @param {Object} props
 * @param {Pokemon} props.value Selected Pokemon
 */
export const Picker = ({ selected = null, onSelect = () => {}, onClose = () => {} }) => {
    const dispatch = useDispatch()
    const data = useSelector(selectPokemonsData)
    const loading = useSelector(selectPokemonsLoading)
    const loadingMore = useSelector(selectPokemonsLoadingMore)
    
    const loadHandler = useCallback(() => dispatch(fetchPokemons()), [])
    const loadMoreHandler = useCallback(() => dispatch(fetchMorePokemons()), [])

    const ItemCompoent = useCallback((item) => (
        <PickerItem {...item} onPress={() => onSelect(item)} selected={item.id == selected?.id} />
    ), [selected?.id])

    return (
        <Modal onClose={onClose}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Select a Pokemon</Text>
            </View>
            <BaseList
                name="pokemons"
                data={data.results}
                loading={loading}
                loadingMore={loadingMore}
                onLoad={loadHandler}
                onLoadMore={loadMoreHandler}
                ItemComponent={ItemCompoent}
                contentContainerStyle={styles.container}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondary,
    },
    headerContainer: {
        flexShrink: 1,
        width: "100%",
        flexDirection: "row",
        marginBottom: 4,
        backgroundColor: Colors.dominant,
    },
    headerText: {
        fontSize: 14,
        fontFamily: "Pusab",
        textTransform: "uppercase",
        color: Colors.secondary,
    }
})