import React, { useCallback } from "react"
import { StyleSheet, View, Text, FlatList } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Colors } from "../../../constants"
import { fetchMorePokemons, selectPokemonsData, selectPokemonsLoading, selectPokemonsLoadingMore } from "../../../redux/reducers/pokemonsSlice"
import { Modal } from "../Modal"
import { ListItem } from "./ListItem"

/**
 * @typedef Pokemon
 * @property {String} id Unique identifier of the pokemon
 * @property {String} name Name of the pokemon
 */

/**
 * @param {Object} props
 * @param {Pokemon} props.value Selected Pokemon
 */
export const List = ({ selected = null, onSelect = () => {}, onClose = () => {} }) => {
    const dispatch = useDispatch()
    const data = useSelector(selectPokemonsData)
    const loading = useSelector(selectPokemonsLoading)
    const loadingMore = useSelector(selectPokemonsLoadingMore)

    const endReachedHandler = useCallback(() => {
        if (!data.results.length || loading || loadingMore) {
            return
        }

        dispatch(fetchMorePokemons())
    }, [data.results.length, loading, loadingMore])

    const renderItem = useCallback(({ item, index }) => (
        <ListItem key={index} {...item} onPress={() => onSelect(item)} selected={item.id == selected?.id} />
    ), [selected?.id])

    return (
        <Modal onClose={onClose}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Select a Pokemon</Text>
            </View>
            <FlatList
                data={data.results}
                refreshing={loading || loadingMore}
                onEndReached={endReachedHandler}
                renderItem={renderItem}
                style={styles.container}
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
        marginBottom: 2,
        backgroundColor: Colors.dominant,
    },
    headerText: {
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: Colors.secondary,
    }
})