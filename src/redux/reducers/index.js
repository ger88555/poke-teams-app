import { combineReducers } from "@reduxjs/toolkit"
import { authSlice } from "./authSlice"
import { regionsSlice } from "./regionsSlice"
import { pokemonsSlice } from "./pokemonsSlice"

export const reducers = combineReducers({
    auth: authSlice.reducer,
    regions: regionsSlice.reducer,
    pokemons: pokemonsSlice.reducer,
})