import { combineReducers } from "@reduxjs/toolkit"
import { authSlice } from "./authSlice"
import { teamsSlice } from "./teamsSlice"
import { regionsSlice } from "./regionsSlice"
import { pokemonsSlice } from "./pokemonsSlice"

export const reducers = combineReducers({
    auth: authSlice.reducer,
    teams: teamsSlice.reducer,
    regions: regionsSlice.reducer,
    pokemons: pokemonsSlice.reducer,
})