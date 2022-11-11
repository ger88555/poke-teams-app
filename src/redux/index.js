import { configureStore } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import { reducers } from "./reducers"

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["auth"]
}

export const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

export const persistor = persistStore(store)