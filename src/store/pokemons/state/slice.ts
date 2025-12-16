import { createSlice } from "@reduxjs/toolkit"
import { reducers as pokemonsReducers} from "./reducers/set-pokemons"

export type PokemonsState = {
  isFetching: boolean
  error: string | null
  pokemons: {
    name: string
    url: string
  }[]
}

/**
 * Redux Entity Adapter
 * id: ['a']
 * entities: {
 *  a: { id: 'a', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
 * } 
 */

export const buildInitialPokemonsState = (): PokemonsState => {
  return {
    isFetching: false,
    error: null,
    pokemons: []
  }
}

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: buildInitialPokemonsState(),
  reducers: {
    ...pokemonsReducers
  }
})

export const { setPokemons, setIsFetching, setError } = pokemonsSlice.actions
export default pokemonsSlice.reducer