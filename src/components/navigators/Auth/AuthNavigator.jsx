import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { styles } from "../styles"

import { Login } from "../../views"

const Stack = createNativeStackNavigator()

const Navigator = () => (
    <Stack.Navigator screenOptions={{
        headerTransparent: true,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: "center",
    }}>
        <Stack.Screen name="Login" component={Login} options={{ title: "Iniciar Sesión" }} />
    </Stack.Navigator>
)

export { Navigator as AuthNavigator }