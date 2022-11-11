import React, { useCallback, useContext } from "react"
import { Pressable } from "react-native"
import { Feather } from "@expo/vector-icons"
import { Colors, Measures } from "../../../constants"
import { NavigationContext } from "@react-navigation/native"

const AddTeamButton = () => {
    const navigation = useContext(NavigationContext)
    
    const pressHandler = useCallback(() => {
        navigation.navigate("TeamCreate")
    }, [])

    return (
        <Pressable onPress={pressHandler}>
            <Feather name="plus" size={Measures.header.iconSize} color={Colors.lightSecondary} />
        </Pressable>
    )
}

const MemoizedAddTeamButton = React.memo(AddTeamButton)

export { MemoizedAddTeamButton as AddTeamButton }