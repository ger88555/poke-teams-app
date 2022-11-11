import React from "react"
import { StyleSheet, TouchableOpacity, Text } from "react-native"
import { Colors } from "../../../constants"

/**
 * @param {Object} props
 * @property {String} id Unique identifier of the pokemon
 * @property {String} name Name of the pokemon
 */
const ListItem = ({ name, onPress = () => {}, selected = false }) => (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={[styles.text, selected && styles.selectedText]}>{name}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderColor: Colors.lightAccent,
    },
    text: {
        fontSize: 16,
        color: Colors.accent,
    },
    selectedText: {
        color: Colors.dominant,
    }
})

const MemoizedListItem = React.memo(ListItem)

export { MemoizedListItem as ListItem }