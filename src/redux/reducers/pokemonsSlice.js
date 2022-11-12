import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Regions } from "../../constants"
import { PokemonsApi } from "../../services/pokeapi"

const initialState = {
    data: {
        region: {
            id: null,
            startId: null,
            endId: null,
        },
        next: null,
        previous: null,
        count: null,
        results: [],
    },
    pagination: {
        page: 0,
        perPage: 60,
    },
    error: null,
    loading: false,
    loadingMore: false,
}

export const fetchPokemons = createAsyncThunk(
    "pokemons/fetch",
    async (_, { rejectWithValue, getState }) => {
        const { pagination: { perPage }, data: { region } } = getState().pokemons

        try {
            // Paginate within the boundaries of the region
            const offset = region.startId-1
            const limit = Math.min(perPage, region.endId - offset)

            if (!limit) {
                return
            }

            const data = await PokemonsApi.list({ limit, offset })
            
            data.results = data.results.map(parsePokemon)

            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchMorePokemons = createAsyncThunk(
    "pokemons/fetch/more",
    async (_, { rejectWithValue, getState }) => {
        const { pagination: { page, perPage }, data: { region } } = getState().pokemons

        try {
            // Paginate within the boundaries of the region
            const offset = region.startId-1 + (perPage * page)
            const regionRemaining = Math.max(region.endId - offset, 0)
            const limit = Math.min(regionRemaining, perPage)

            if (!limit) {
                return
            }
            
            const data = await PokemonsApi.list({ limit, offset })
            
            data.results = data.results.map(parsePokemon)

            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const pokemonsSlice = createSlice({
    name: "pokemons",
    initialState,
    reducers: {
        setPokemonsRegion: (state, { payload = "" }) => {
            const region = Regions.domains[payload] || initialState.data.region

            state.data.region.startId = region.startId
            state.data.region.endId = region.endId
            state.data.region.id = payload
        },
    },
    extraReducers: ({ addCase }) => {
        addCase(fetchPokemons.pending, (state) => {
            state.loading = true
        })

        addCase(fetchPokemons.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        addCase(fetchPokemons.fulfilled, (state, { payload }) => {
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

        addCase(fetchMorePokemons.pending, (state) => {
            state.loadingMore = true
        })

        addCase(fetchMorePokemons.rejected, (state, { payload }) => {
            state.loadingMore = false
            state.error = payload
        })

        addCase(fetchMorePokemons.fulfilled, (state, { payload }) => {
            if (!payload) {
                return
            }

            state.pagination.page++
            state.loadingMore = false
            state.error = null
            state.data.next = payload.next
            state.data.results.push(...payload.results)
        })
    }
})

export const { setPokemonsRegion } = pokemonsSlice.actions

const parsePokemon = (pokemon) => ({
    id: pokemon.url,
    name: pokemon.name,
})

export const selectPokemonsData = state => state.pokemons.data
export const selectPokemonsError = state => state.pokemons.error
export const selectPokemonsLoading = state => state.pokemons.loading
export const selectPokemonsLoadingMore = state => state.pokemons.loadingMore
export const selectPokemonsRegionId = state => state.pokemons.data.region.id