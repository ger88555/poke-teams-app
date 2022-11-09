import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { connect } from "react-redux"
import { Colors } from "../../../constants"
import { Screen } from "../../common"

const Profile = () => {    
    return (
        <Screen scrollable={false}>
            <View style={styles.container}>
                <Text style={styles.text}>This is the Profile screen.</Text>
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

const ConnectedProfile = connect(null)(Profile)

export { ConnectedProfile as Profile }