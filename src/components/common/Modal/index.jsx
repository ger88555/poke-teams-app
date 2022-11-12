import React from "react"
import { StyleSheet, View, TouchableWithoutFeedback, Modal as BaseModal, SafeAreaView } from "react-native"
import { Colors, Measures } from "../../../constants"

export const Modal = ({ onClose = () => {}, children }) => (
    <BaseModal onRequestClose={onClose} transparent={true}>
        <TouchableWithoutFeedback onPress={onClose}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.innerContainer}>
                    {children}
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
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