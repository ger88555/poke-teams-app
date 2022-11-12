import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TeamsApi } from "../../services/firestore"

const initialState = {
    data: {
        id: null,
        name: "",
        region: {
            id: null,
            name: "",
        },
        pokemons: []
    },
    error: null,
    loading: false,
}

export const fetchTeam = createAsyncThunk(
    "team/details/fetch",
    async (id, { rejectWithValue }) => {

        try {
            return await TeamsApi.get(id)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const teamDetailsSlice = createSlice({
    name: "teamDetails",
    initialState,
    extraReducers: ({ addCase }) => {
        addCase(fetchTeam.pending, (state) => {
            state.loading = true
        })

        addCase(fetchTeam.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        addCase(fetchTeam.fulfilled, (state, { payload }) => {
            if (!payload) {
                return
            }

            state.loading = false
            state.error = null
            state.data = payload
        })
    },
})

export const selectTeamData = state => state.teamDetails.data
export const selectTeamError = state => state.teamDetails.error
export const selectTeamLoading = state => state.teamDetails.loading