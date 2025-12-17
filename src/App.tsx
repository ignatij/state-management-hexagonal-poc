
import { getErrorSelector, getIsFetchingSelector, getPokemonsSelector } from './adapters/primary/store/pokemons/state/selectors/get-pokemons.selector'
import { fetchPokemons } from './adapters/primary/store/pokemons/state/thunks/fetchPokemons'
import { useAppDispatch, useAppSelector } from './adapters/primary/store/store'
import './App.css'

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
