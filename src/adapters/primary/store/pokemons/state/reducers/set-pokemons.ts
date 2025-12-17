import type { PayloadAction } from "@reduxjs/toolkit"
import type { PokemonsState } from "../slice"

export const reducers = {
  setPokemons: (state: PokemonsState, action: PayloadAction<{ pokemons: { name: string, url: string }[] }>) => {
    state.pokemons = action.payload.pokemons
    state.isFetching = false
    state.error = null
  },
  setIsFetching: (state: PokemonsState, action: PayloadAction<boolean>) => {
    state.isFetching = action.payload
  },
  setError: (state: PokemonsState, action: PayloadAction<string | null>) => {
    state.error = action.payload
  }
}