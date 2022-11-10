import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { styles } from "../styles"

import { Profile } from "../../views"

const Stack = createNativeStackNavigator()

const Navigator = () => (
    <Stack.Navigator screenOptions={{
        headerShadowVisible: false,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: "center",
    }}>
        <Stack.Screen name="Profile" component={Profile} options={{ title: "My Profile" }} />
    </Stack.Navigator>
)

export { Navigator as ProfileNavigator }