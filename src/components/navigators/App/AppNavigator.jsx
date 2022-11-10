import React from "react"
import { Feather } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Colors } from "../../../constants"
import { styles } from "../styles"

import { TeamsNavigator } from "./TeamsNavigator"
import { ProfileNavigator } from "./ProfileNavigator"

const Tab = createBottomTabNavigator()

const icons = {
    "TeamsNavigator": "award",
    "ProfileNavigator": "user",
}

const Navigator = () => (
    <Tab.Navigator initialRouteName="TeamsNavigator" tabBarPosition="bottom" backBehavior="none" screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size = 30 }) => {
            const name = icons[route.name]

            return <Feather name={name} size={size} color={color} />
        },
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.dominant,
        tabBarInactiveTintColor: Colors.lightAccent
    })}>
        <Tab.Screen name="TeamsNavigator" component={TeamsNavigator} options={{ title: "My Teams" }} />
        <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} options={{ title: "My Profile" }} />
    </Tab.Navigator>
)

export { Navigator as AppNavigator }