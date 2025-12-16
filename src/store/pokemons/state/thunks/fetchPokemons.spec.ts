import {describe, it, expect} from 'vitest'
import { fetchPokemons } from './fetchPokemons'
import type { QuarzoDependencies } from '../../../../core/quarzo.dependencies'
import { inMemoryPokemonsGateway } from '../../../../adapters/pokemons/in-memory-pokemons.gateway'
import { createStore } from '../../../store'
import { getIsFetchingSelector, getPokemonsSelector } from '../selectors/get-pokemons.selector'

describe('fetchPokemons', () => {
  it('should fetch the pokemons', async () => {
    // given 
    const dependencies: QuarzoDependencies = {
      getPokemonsGateway: inMemoryPokemonsGateway({ feedWithPokemons: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }] })
    }

    // when
    const store = createStore(dependencies)

     store.dispatch(fetchPokemons())
     const isFetching = getIsFetchingSelector(store.getState())
     expect(isFetching).toBe(true)

    // then
    await new Promise(resolve => setTimeout(resolve, 10))
    
    const pokemons = getPokemonsSelector(store.getState())
    expect(pokemons).toEqual([{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }])

    const isFetchingAfter = getIsFetchingSelector(store.getState())
    expect(isFetchingAfter).toBe(false)
  })

 
})