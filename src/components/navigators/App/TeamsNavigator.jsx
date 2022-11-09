import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Teams } from "../../views"

const Stack = createNativeStackNavigator()

const Navigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Teams" component={Teams} options={{ title: "My Teams" }} />
    </Stack.Navigator>
)

export { Navigator as TeamsNavigator }