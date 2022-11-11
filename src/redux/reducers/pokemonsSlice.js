import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PokemonsApi } from "../../services/pokeapi"

const initialState = {
    data: {
        next: null,
        previous: null,
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

export const fetchPokemons = createAsyncThunk(
    "pokemons/fetch",
    async (_, { rejectWithValue, getState }) => {
        const { perPage } = getState().pokemons.pagination

        try {
            const data = await PokemonsApi.list({ limit: perPage })
            
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
        const { pagination: { page, perPage }, data: { next } } = getState().pokemons

        if (!next) {
            return []
        }

        try {
            const data = await PokemonsApi.list({ limit: perPage, offset: perPage * page })
            
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
            state.data.results = [
                ...state.data.results,
                ...payload.results
            ]
        })
    }
})

const parsePokemon = (pokemon) => ({
    id: pokemon.url,
    name: pokemon.name,
})

export const selectPokemonsData = state => state.pokemons.data
export const selectPokemonsError = state => state.pokemons.error
export const selectPokemonsLoading = state => state.pokemons.loading
export const selectPokemonsLoadingMore = state => state.pokemons.loadingMore