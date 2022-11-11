import React, { useCallback, useState } from "react"
import { StyleSheet, useWindowDimensions } from "react-native"
import { FormProvider, useForm } from "react-hook-form"
import { SceneMap, TabView } from "react-native-tab-view"
import { DetailsStep } from "./DetailsStep"
import { PokemonsStep } from "./PokemonsStep"
import { Measures } from "../../../constants"
import { TabBar } from "./TabBar"

const renderScene = SceneMap({
    details: DetailsStep,
    pokemons: PokemonsStep,
})

export const TeamForm = () => {
    const layout = useWindowDimensions()
    const methods = useForm()
    
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