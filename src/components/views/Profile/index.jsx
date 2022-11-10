import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { logout } from "../../../redux/reducers/authSlice"
import { Button, ProfileCard, Screen, Separator } from "../../common"

export const Profile = () => {
    const dispatch = useDispatch()

    const handleLogout = useCallback(() => {
        dispatch(logout())
    }, [])

    return (
        <Screen>
            <ProfileCard />
            <Separator />
            <Button title="Sign out" onPress={handleLogout} />
        </Screen>
    )
}