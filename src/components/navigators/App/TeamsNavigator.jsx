import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { styles } from "../styles"

import { Teams } from "../../views"

const Stack = createNativeStackNavigator()

const Navigator = () => (
    <Stack.Navigator screenOptions={{
        headerShadowVisible: false,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: "center",
    }}>
        <Stack.Screen name="Teams" component={Teams} options={{ title: "My Teams" }} />
    </Stack.Navigator>
)

export { Navigator as TeamsNavigator }