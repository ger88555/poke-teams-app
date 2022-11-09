import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { connect } from "react-redux"
import { Colors } from "../../../constants"
import { Screen } from "../../common"

const Teams = () => {    
    return (
        <Screen scrollable={false}>
            <View style={styles.container}>
                <Text style={styles.text}>This is the Teams screen.</Text>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
    },
    text: {
        color: Colors.lightSecondary,
        textAlign: "center",
    }
})

const ConnectedTeams = connect(null)(Teams)

export { ConnectedTeams as Teams }