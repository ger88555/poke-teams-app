import React, { useCallback } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { List, Screen, TeamListItem } from "../../common"
import { fetchTeams, fetchMoreTeams } from "../../../redux/features/teamsSlice"
import { selectTeamsData, selectTeamsLoading, selectTeamsLoadingMore } from "../../../redux/features/teamsSlice"

const Teams = ({ navigation }) => {
    const dispatch = useDispatch()
    const teams = useSelector(selectTeamsData)
    const loading = useSelector(selectTeamsLoading)
    const loadingMore = useSelector(selectTeamsLoadingMore)

    const loadHandler = useCallback(() => { dispatch(fetchTeams()) }, [])
    const loadMoreHandler = useCallback(() => { dispatch(fetchMoreTeams()) }, [])

    useFocusEffect(loadHandler)

    const itemPressHandler = useCallback((id) => {
        navigation.navigate("TeamDetails", { id })
    }, [])

    const ItemComponent = useCallback((item) => (
        <TeamListItem {...item} onPress={() => itemPressHandler(item.id)} />
    ), [itemPressHandler])

    return (
        <Screen scrollable={false}>
            <List 
                name="teams"
                data={teams}
                onLoad={loadHandler}
                onLoadMore={loadMoreHandler}
                loading={loading}
                loadingMore={loadingMore}
                ItemComponent={ItemComponent}
            />
        </Screen>
    )
}

const ConnectedTeams = connect(null)(Teams)

export { ConnectedTeams as Teams }