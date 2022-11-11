import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RegionsApi } from "../../services/pokeapi"

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
        const { perPage } = getState().regions.pagination

        try {
            const data = await RegionsApi.list({ limit: perPage })
            
            data.results = data.results.map(parseRegion)

            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchMoreRegions = createAsyncThunk(
    "regions/fetch/more",
    async (_, { rejectWithValue, getState }) => {
        const { pagination: { page, perPage }, data: { next } } = getState().regions

        if (!next) {
            return []
        }

        try {
            const data = await RegionsApi.list({ limit: perPage, offset: perPage * page })
            
            data.results = data.results.map(parseRegion)

            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const parseRegion = (region) => ({
    id: region.url,
    name: region.name,
})

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
            if (!payload) {
                return
            }

            state.pagination.page = 1
            state.loading = false
            state.error = null
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
            if (!payload) {
                return
            }

            state.pagination.page++
            state.loadingMore = false
            state.error = null
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