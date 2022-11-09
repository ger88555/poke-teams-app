import React, { useCallback, useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { StoreProvider } from "../StoreProvider"
import { NavigationContainer } from "@react-navigation/native"
import { MainNavigator } from "../../navigators"
import * as SplashScreen from "expo-splash-screen"
import { initAxios } from "../../../utils"

SplashScreen.preventAutoHideAsync()

export const Root = () => {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        initAxios()

        // other setup tasks

        setIsReady(true)
    }, [])

    const hideSplashScreen = useCallback(() => {
        // Recommended delay used by the abandoned "expo-app-loading" package
        // that prevents a black screen in-between the Splash screen and the App
        setTimeout(SplashScreen.hideAsync, 200)
    }, [])

    if (!isReady) {
        return null
    }

    return (
        <StoreProvider>
            <NavigationContainer onReady={hideSplashScreen}>
                <StatusBar style="inverted" />
                <MainNavigator />
            </NavigationContainer>
        </StoreProvider>
    )
}