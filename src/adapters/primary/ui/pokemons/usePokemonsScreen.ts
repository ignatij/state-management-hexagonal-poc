import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getErrorSelector, getIsFetchingSelector, getPokemonsSelector } from '../../store/pokemons/state/selectors/get-pokemons.selector'
import { fetchPokemons } from '../../store/pokemons/state/thunks/fetchPokemons'

export const usePokemonsScreen = () => {
  const dispatch = useAppDispatch()
  const pokemons = useAppSelector(getPokemonsSelector)
  const isLoading = useAppSelector(getIsFetchingSelector)
  const error = useAppSelector(getErrorSelector)

  const load = useCallback(() => dispatch(fetchPokemons()), [dispatch])

  return {
    state: { pokemons, isLoading, error },
    actions: { load },
  }
}
