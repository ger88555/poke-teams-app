import React, { useEffect } from "react"
import { StyleSheet } from "react-native"
import { useDispatch } from "react-redux"
import { fetchTeam } from "../../../redux/reducers/teamDetailsSlice"
import { Screen, TeamForm } from "../../common"

export const TeamEdit = ({ route }) => {
    const { id } = route?.params || {}
    const dispatch = useDispatch()
    
    useEffect(() => { dispatch(fetchTeam(id)) }, [id])

    return (
        <Screen scrollable={false} style={styles.screen}>
            <TeamForm />
        </Screen>
    )
}

const styles = StyleSheet.create({
    screen: {
        width: "100%",
        paddingHorizontal: 0,
        paddingTop: 0,
    }
})