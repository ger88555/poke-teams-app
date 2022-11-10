import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {
        email: "",
        photoURL: "",
        displayName: "",
    },
    credential: {
        providerId: null,
        token: ""
    },
    error: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, { payload }) {
            const { displayName, email, photoURL } = payload.user
            const { providerId, token } = payload

            state.user = {
                email,
                photoURL,
                displayName,
            }
            state.credential = {
                providerId,
                token
            }
            state.error = initialState.error
        },
        logout(state) {
            state.user = initialState.user
            state.credential = initialState.credential
            state.error = initialState.error
        },
        setError(state, { payload }) {
            state.user = initialState.user,
            state.credential = initialState.credential
            state.error = payload
        },
    }
})

export const { login, logout, setError } = authSlice.actions

export const selectUser = state => state.auth.user
export const selectError = state => state.auth.error
export const selectIsAuthenticated = state => !!state.auth.credential.token?.length