import React, { useCallback, useContext, useState } from "react"
import { StyleSheet, Alert } from "react-native"
import { Entypo } from "@expo/vector-icons"
import { Colors, Measures } from "../../../constants"
import { NavigationContext, NavigationRouteContext } from "@react-navigation/native"
import { FloatingMenu } from "react-native-floating-action-menu"
import { TeamsApi } from "../../../services/firestore"

const TeamOptionsButton = () => {
    const navigation = useContext(NavigationContext)
    const route = useContext(NavigationRouteContext)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const id = route?.params?.id
    
    const updatePressHandler = useCallback(() => {
        navigation.navigate("TeamEdit", { id })
        setIsOpen(false)
    }, [id])
    const deletePressHandler = useCallback(() => {
        Alert.alert("Delete Team", "Are you sure you want to delete this team?", [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: deleteTeam, style: "destructive" },
        ])
    }, [deleteTeam])

    const deleteTeam = useCallback(async () => {
        setIsDeleting(true)
        try {
            await TeamsApi.delete(id)

            setIsDeleting(false)
            navigation.navigate("Teams")
        } catch (e) {
            Alert.alert("Error", e.message)

            setIsDeleting(false)
        }
    }, [id])

    const renderItemIcon = useCallback(({ icon }, index, { itemsDown }) => (
        <Entypo name={icon} size={Measures.header.iconSize-8} color={itemsDown[index] ? Colors.dominant : Colors.lightSecondary} />
    ), [])

    const renderMenuIcon = useCallback(({ menuButtonDown }) => (
        <Entypo name={menuButtonDown ? "cross" : "menu"} size={Measures.header.iconSize-8} color={menuButtonDown ? Colors.dominant : Colors.lightSecondary} />
    ), [])

    return (
        <FloatingMenu
            items={[
                { label: "Edit", onPress: updatePressHandler, icon: "edit", labelStyle: styles.label },
                { label: "Delete", onPress: deletePressHandler, icon: "trash", labelStyle: styles.label, isPending: isDeleting },
            ]}
            isOpen={isOpen}
            onMenuToggle={() => setIsOpen(v => !v)}
            renderItemIcon={renderItemIcon}
            renderMenuIcon={renderMenuIcon}
            dimmerStyle={styles.dimmer}
            borderColor={Colors.accent}
            primaryColor={Colors.lightSecondary}
            backgroundUpColor={Colors.dominant}
            backgroundDownColor={Colors.lightSecondary}
            right={Measures.floatingActionButton.insetRight}
            bottom={Measures.floatingActionButton.insetBottom}
            buttonWidth={Measures.floatingActionButton.height}
        />
    )
}

const styles = StyleSheet.create({
    dimmer: {
        backgroundColor: Colors.blackTransparent,
    },
    label: {
        fontSize: 18,
        fontFamily: "Minecraft",
        color: Colors.lightSecondary,
    },
})

const MemoizedTeamOptionsButton = React.memo(TeamOptionsButton)

export { MemoizedTeamOptionsButton as TeamOptionsButton }