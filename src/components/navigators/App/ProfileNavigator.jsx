import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Profile } from "../../views"

const Stack = createNativeStackNavigator()

const Navigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} options={{ title: "My Profile" }} />
    </Stack.Navigator>
)

export { Navigator as ProfileNavigator }