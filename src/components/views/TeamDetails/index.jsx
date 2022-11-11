import React, { useCallback } from "react"
import { StyleSheet } from "react-native"
import { useDispatch } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { fetchTeam } from "../../../redux/reducers/teamDetailsSlice"
import { Screen, TeamCard, TeamOptionsButton } from "../../common"

export const TeamDetails = ({ route }) => {
    const id = route.params?.id

    const dispatch = useDispatch()

    const refresh = useCallback(() => { dispatch(fetchTeam(id)) }, [id])
    useFocusEffect(refresh)

    return (
        <>
            <Screen style={styles.screen}>
                <TeamCard />
            </Screen>
            <TeamOptionsButton />
        </>
    )
}

const styles = StyleSheet.create({
    screen: {
    }
})