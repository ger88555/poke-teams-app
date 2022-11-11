import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TeamsApi } from "../../services/firestore"

const initialState = {
    data: [],
    pagination: {
        page: 0,
        perPage: 60,
    },
    error: null,
    loading: false,
    loadingMore: false,
}

export const fetchTeams = createAsyncThunk(
    "teams/fetch",
    async (_, { rejectWithValue, getState }) => {
        const id = getState().auth.user.id
        const { perPage } = getState().teams.pagination

        try {
            return await TeamsApi.list({ limit: perPage, user: id })
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchMoreTeams = createAsyncThunk(
    "teams/fetch/more",
    async (_, { rejectWithValue, getState }) => {
        const id = getState().auth.user.id
        const { pagination: { page, perPage }, data: { next } } = getState().teams

        if (!next) {
            return []
        }

        try {
            return await TeamsApi.list({ limit: perPage, offset: perPage * page, user: id })
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const teamsSlice = createSlice({
    name: "teams",
    initialState,
    extraReducers: ({ addCase }) => {
        addCase(fetchTeams.pending, (state) => {
            state.loading = true
        })

        addCase(fetchTeams.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        addCase(fetchTeams.fulfilled, (state, { payload }) => {
            if (!payload) {
                return
            }

            state.pagination.page = 1
            state.loading = false
            state.error = null
            state.data = [
                ...payload
            ]
        })

        addCase(fetchMoreTeams.pending, (state) => {
            state.loadingMore = true
        })

        addCase(fetchMoreTeams.rejected, (state, { payload }) => {
            state.loadingMore = false
            state.error = payload
        })

        addCase(fetchMoreTeams.fulfilled, (state, { payload }) => {
            if (!payload) {
                return
            }

            state.pagination.page++
            state.loadingMore = false
            state.error = null
            state.data = [
                ...state.data,
                ...payload
            ]
        })
    },
})

export const selectTeamsData = state => state.teams.data
export const selectTeamsError = state => state.teams.error
export const selectTeamsLoading = state => state.teams.loading
export const selectTeamsLoadingMore = state => state.teams.loadingMore