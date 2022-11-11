import React, { useCallback } from "react"
import { FlatList } from "react-native"
import { connect, useDispatch, useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { Screen, TeamListItem } from "../../common"
import { fetchTeams, fetchMoreTeams } from "../../../redux/reducers/teamsSlice"
import { selectTeamsData, selectTeamsLoading, selectTeamsLoadingMore } from "../../../redux/reducers/teamsSlice"

const Teams = ({ navigation }) => {
    const dispatch = useDispatch()
    const teams = useSelector(selectTeamsData)
    const loading = useSelector(selectTeamsLoading)
    const loadingMore = useSelector(selectTeamsLoadingMore)

    const refresh = useCallback(() => { dispatch(fetchTeams()) }, [])
    const refreshHandler = useCallback(() => {
        if (loading || loadingMore) {
            return
        }

        refresh()
    }, [loading, loadingMore, refresh])

    const endReachedHandler = useCallback(() => {
        if (!teams.length || loading || loadingMore) {
            return
        }
        
        dispatch(fetchMoreTeams())
    }, [teams.length, loading, loadingMore])

    useFocusEffect(refresh)

    const itemPressHandler = useCallback((id) => {
        navigation.navigate("TeamDetails", { id })
    }, [])

    const renderItem = useCallback(({ item, index }) => (
        <TeamListItem key={index} {...item} onPress={() => itemPressHandler(item.id)} />
    ), [itemPressHandler])

    return (
        <Screen scrollable={false}>
            <FlatList
                data={teams}
                onRefresh={refreshHandler}
                refreshing={loading || loadingMore}
                onEndReached={endReachedHandler}
                renderItem={renderItem}
            />
        </Screen>
    )
}

const ConnectedTeams = connect(null)(Teams)

export { ConnectedTeams as Teams }