import type { AppState } from "../../../app-state"

export const getPokemonsSelector = (state: AppState) => state.pokemons.pokemons
export const getIsFetchingSelector = (state: AppState) => state.pokemons.isFetching
export const getErrorSelector = (state: AppState) => state.pokemons.error