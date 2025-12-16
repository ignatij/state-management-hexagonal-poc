
import './App.css'
import {  useAppDispatch, useAppSelector } from './store/store'
import { fetchPokemons } from './store/pokemons/state/thunks/fetchPokemons'
import { getErrorSelector, getIsFetchingSelector, getPokemonsSelector } from './store/pokemons/state/selectors/get-pokemons.selector'

function App() {
  const dispatch = useAppDispatch()
  const error = useAppSelector(getErrorSelector)
  const isLoading = useAppSelector(getIsFetchingSelector)
  const pokemons = useAppSelector(getPokemonsSelector)

  const getPokemons = () => {
    dispatch(fetchPokemons())
  }

  return (
      <main>
        <button onClick={getPokemons}>Get Pokemons</button>
        {error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
        {pokemons.length > 0 && <ul>
          {pokemons.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>}
      </main>
  )
}

export default App
