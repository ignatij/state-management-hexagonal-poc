import type { QuarzoDependencies } from "../../../../core/quarzo.dependencies"
import { getPokemonsHandler } from "../../../../core/use-cases"
import { setError, setIsFetching, setPokemons } from "../slice"
import type { RootState } from "../../../store"
import type { Action, ThunkAction } from "@reduxjs/toolkit"

type AppThunk = ThunkAction<
  Promise<void>,
  RootState,
  QuarzoDependencies,
  Action<string>
>

export const fetchPokemons = (): AppThunk => async (
  dispatch,
  _getState,
  deps,
) => {
  dispatch(setIsFetching(true))
  try {
    const result = await getPokemonsHandler(deps.getPokemonsGateway)
    dispatch(setPokemons({ pokemons: result }))
  } catch (e) {
    dispatch(setError((e as Error).message))
  } finally {
    dispatch(setIsFetching(false))
  }
}