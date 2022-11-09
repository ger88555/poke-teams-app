import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { AppNavigator } from "./App"
import { AuthNavigator } from "./Auth"
import { connect } from "react-redux"

const Stack = createNativeStackNavigator()

const Navigator = ({ authenticated }) => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authenticated ? (
            <Stack.Screen name="App" component={AppNavigator} />
        ) : (
            <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
    </Stack.Navigator>
)

const ConnectedNavigator = connect(state => state.auth)(Navigator)

export { ConnectedNavigator as MainNavigator }