import React from "react"
import { useSelector } from "react-redux"
import { selectIsAuthenticated } from "../../redux/reducers/authSlice"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { AppNavigator } from "./App"
import { AuthNavigator } from "./Auth"

const Stack = createNativeStackNavigator()

const Navigator = () => {
    const authenticated = useSelector(selectIsAuthenticated)

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {authenticated ? (
                <Stack.Screen name="App" component={AppNavigator} />
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
        </Stack.Navigator>
    )
}

export { Navigator as MainNavigator }