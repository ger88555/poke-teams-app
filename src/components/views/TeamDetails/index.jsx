import React, { useCallback } from "react"
import { StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { fetchTeam, selectTeamLoading } from "../../../redux/reducers/teamDetailsSlice"
import { LoadingIndicator, Screen, TeamCard, TeamOptionsButton } from "../../common"

export const TeamDetails = ({ route }) => {
    const id = route.params?.id

    const dispatch = useDispatch()
    const loading = useSelector(selectTeamLoading)

    const refresh = useCallback(() => { dispatch(fetchTeam(id)) }, [id])
    useFocusEffect(refresh)

    return (
        <>
            <Screen style={styles.screen}>
                {loading ? <LoadingIndicator /> : <TeamCard />}
            </Screen>
            <TeamOptionsButton />
        </>
    )
}

const styles = StyleSheet.create({
    screen: {
    }
})