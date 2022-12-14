import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AddTeamButton } from "../../common"
import { styles } from "../styles"

import { Teams, TeamCreate, TeamDetails, TeamEdit } from "../../views"

const Stack = createNativeStackNavigator()

const Navigator = () => (
    <Stack.Navigator screenOptions={{
        headerShadowVisible: false,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: "center",
        animation: "slide_from_right"
    }}>
        <Stack.Screen name="Teams" component={Teams} options={{ title: "My Teams", headerRight: (props) => <AddTeamButton {...props} /> }} />
        <Stack.Screen name="TeamCreate" component={TeamCreate} options={{ title: "New Team" }} />
        <Stack.Screen name="TeamDetails" component={TeamDetails} options={{ title: "Team Info" }} />
        <Stack.Screen name="TeamEdit" component={TeamEdit} options={{ title: "Edit Team" }} />
    </Stack.Navigator>
)

export { Navigator as TeamsNavigator }