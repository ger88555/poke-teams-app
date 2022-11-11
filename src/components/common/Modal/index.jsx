import React from "react"
import { StyleSheet, View, Modal as BaseModal } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Measures } from "../../../constants"

export const Modal = ({ onClose = () => {}, children }) => (
    <BaseModal onRequestClose={onClose} transparent={true}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.innerContainer}>
                {children}
            </View>
        </SafeAreaView>
    </BaseModal>
)

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.blackTransparent,
    },
    innerContainer: {
        flex: 1,
        paddingVertical: Measures.modal.insetY,
        paddingHorizontal: Measures.modal.insetX,
        marginVertical: Measures.modal.offsetY,
        marginHorizontal: Measures.modal.offsetX,
        backgroundColor: Colors.dominant,
        borderRadius: Measures.modal.borderRadius,
    }
})