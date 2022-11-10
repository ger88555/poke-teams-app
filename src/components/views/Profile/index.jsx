import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { logout } from "../../../redux/reducers/authSlice"
import { Button, Screen } from "../../common"

export const Profile = () => {
    const dispatch = useDispatch()

    const handleLogout = useCallback(() => {
        dispatch(logout())
    }, [])

    return (
        <Screen scrollable={false}>
            <Button title="Sign out" onPress={handleLogout} />
        </Screen>
    )
}