import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RegionsApi } from "../../services/pokeapi"
import { TeamsApi } from "../../services/firestore"

const initialState = {
    data: {
        next: null,
        count: null,
        results: []
    },
    pagination: {
        page: 0,
        perPage: 60,
    },
    error: null,
    loading: false,
    loadingMore: false,
}

export const fetchRegions = createAsyncThunk(
    "regions/fetch",
    async (_, { rejectWithValue, getState }) => {
        const userId = getState().auth.user.id
        const { perPage } = getState().regions.pagination

        try {
            const data = await RegionsApi.list({ limit: perPage })
            const usage = await TeamsApi.getTeamsPerRegion(userId, data.results.map(r => r.url))

            data.results = parseRegions(data.results, usage)

            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchMoreRegions = createAsyncThunk(
    "regions/fetch/more",
    async (_, { rejectWithValue, getState }) => {
        const userId = getState().auth.user.id
        const { pagination: { page, perPage }, data: { next } } = getState().regions

        if (!next) {
            return []
        }

        try {
            const data = await RegionsApi.list({ limit: perPage, offset: perPage * page })
            const usage = await TeamsApi.getTeamsPerRegion(userId, data.results.map(r => r.url))
            
            data.results = parseRegions(data.results, usage)

            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const parseRegions = (regions, usage) => {
    return regions.map(r => ({
        id: r.url,
        name: r.name,
        usage: usage[r.url] || 0
    }))
}

export const regionsSlice = createSlice({
    name: "regions",
    initialState,
    extraReducers: ({ addCase }) => {
        addCase(fetchRegions.pending, (state) => {
            state.loading = true
        })

        addCase(fetchRegions.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        addCase(fetchRegions.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = null
            
            if (!payload) {
                return
            }

            state.pagination.page = 1
            state.data.count = payload.count
            state.data.next = payload.next
            state.data.results = [
                ...payload.results
            ]
        })

        addCase(fetchMoreRegions.pending, (state) => {
            state.loadingMore = true
        })

        addCase(fetchMoreRegions.rejected, (state, { payload }) => {
            state.loadingMore = false
            state.error = payload
        })

        addCase(fetchMoreRegions.fulfilled, (state, { payload }) => {
            state.loadingMore = false
            state.error = null

            if (!payload) {
                return
            }

            state.pagination.page++
            state.data.next = payload.next
            state.data.results = [
                ...state.data.results,
                ...payload.results
            ]
        })
    }
})

export const selectRegionsData = state => state.regions.data
export const selectRegionsError = state => state.regions.error
export const selectRegionsLoading = state => state.regions.loading
export const selectRegionsLoadingMore = state => state.regions.loadingMore