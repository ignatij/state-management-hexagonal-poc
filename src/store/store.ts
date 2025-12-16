import { combineReducers, configureStore } from '@reduxjs/toolkit'
import pokemonsReducer, { buildInitialPokemonsState } from './pokemons/state/slice'
import { useDispatch, useSelector } from 'react-redux'
import type { AppState } from './app-state'
import type { QuarzoDependencies } from '../core/quarzo.dependencies'
import { inMemoryPokemonsGateway } from '../adapters/pokemons/in-memory-pokemons.gateway'

export const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  // add other reducers here
})



const preloadState: AppState = {
  pokemons: buildInitialPokemonsState()
}

export const createStore = (dependencies: QuarzoDependencies, hydrate: AppState = preloadState) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getGefaultMiddleware) =>
      getGefaultMiddleware({ thunk: { extraArgument: dependencies } }),
    preloadedState: hydrate,
  });


const testDependencies: QuarzoDependencies = {
  getPokemonsGateway: inMemoryPokemonsGateway({ feedWithPokemons: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }] })
}

export const store = createStore(testDependencies)

store.subscribe(() => {
  console.log('state changed', store.getState())
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector)