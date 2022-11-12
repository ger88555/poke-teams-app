import React, { useCallback, useContext, useMemo, useState } from "react"
import { StyleSheet, useWindowDimensions } from "react-native"
import { FormProvider, useForm } from "react-hook-form"
import { SceneMap, TabView } from "react-native-tab-view"
import { DetailsStep } from "./DetailsStep"
import { PokemonsStep } from "./PokemonsStep"
import { Measures } from "../../../constants"
import { TabBar } from "./TabBar"
import { useSelector } from "react-redux"
import { selectTeamData } from "../../../redux/features/teamDetailsSlice"
import { NavigationRouteContext } from "@react-navigation/native"

const renderScene = SceneMap({
    details: DetailsStep,
    pokemons: PokemonsStep,
})

export const TeamForm = () => {
    const teamId = useContext(NavigationRouteContext).params?.id
    const existing = useSelector(selectTeamData)
    const defaultValues = useMemo(
        () => teamId ? Object.assign({}, existing, { region_id: existing.region.id }) : undefined,
        [teamId]
    )
    const methods = useForm({ defaultValues })
    
    const layout = useWindowDimensions()
    const renderTabBar = useCallback((props) => <TabBar {...props} />, [])
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: "details", title: "Team" },
        { key: "pokemons", title: "Pokemons" },
    ])

    return (
        <FormProvider {...methods}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                sceneContainerStyle={styles.scene}
                style={styles.tabView}
                renderTabBar={renderTabBar}
            />
        </FormProvider>
    )
}

const styles = StyleSheet.create({
    tabView: {
        width: "100%"
    },
    scene: {
        paddingTop: Measures.screen.insetTop,
        paddingHorizontal: Measures.screen.insetX,
    }
})