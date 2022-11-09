import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: {
        email: "",
        token: ""
    },
    loading: false,
    errors: {},
    authenticated: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logInStart(state) {
            state = { ...initialState }
            state.loading = true
        },
        logInSuccess(state, { payload }) {
            const { email, token } = payload

            state = {
                ...initialState,
                data: { email, token },
                authenticated: true
            }
        },
        logInFailure(state, { payload }) {
            const { errors } = payload

            state = {
                ...initialState,
                errors
            }
        },
        logOutStart(state) {
            state.loading = true
        },
        logOutSuccess(state) {
            // eslint-disable-next-line no-unused-vars
            state = { ...initialState }
        }
    }
})