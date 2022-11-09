import React, { useCallback } from "react"
import { PersistGate } from "redux-persist/lib/integration/react"
import { Provider } from "react-redux"
import { setAxiosAuthentication } from "../../../utils"
import { store, persistor } from "../../../redux"

export const StoreProvider = ({ children }) => {

    const onReady = useCallback(async () => {
        await restoreAuth()
    }, [])

    const restoreAuth = useCallback(async () => {
        const { token, authenticated } = store.getState().auth

        if (authenticated) {
            setAxiosAuthentication(token)
        }
    }, [])

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null} onBeforeLift={onReady}>
                {children}
            </PersistGate>
        </Provider>
    )
}