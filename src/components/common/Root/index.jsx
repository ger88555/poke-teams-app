import React, { useCallback, useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { StoreProvider } from "../StoreProvider"
import { NavigationContainer } from "@react-navigation/native"
import { MainNavigator } from "../../navigators"
import * as SplashScreen from "expo-splash-screen"
import { NavigationTheme } from "../../../constants"
import { initAxios, initFirebase } from "../../../utils"
import * as Font from "expo-font"

SplashScreen.preventAutoHideAsync()

export const Root = () => {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        initAxios()
        initFirebase()

        loadFonts().finally(() => setIsReady(true))
    }, [])

    const loadFonts = useCallback(async () => {
        return await Font.loadAsync({
            "Minecraft": require("../../../assets/fonts/Minecraft.ttf"),
            "Pusab": require("../../../assets/fonts/Pusab.ttf"),
        })
    })

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
            <NavigationContainer onReady={hideSplashScreen} theme={NavigationTheme}>
                <StatusBar style="inverted" />
                <MainNavigator />
            </NavigationContainer>
        </StoreProvider>
    )
}