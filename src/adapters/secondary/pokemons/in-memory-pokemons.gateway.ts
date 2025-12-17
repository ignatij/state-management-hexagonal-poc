import type { GetPokemonsGatewayPort } from "../../../core/ports/get-pokemons.gateway.port"

// feedWithError
export const inMemoryPokemonsGateway = ({feedWithPokemons}: {feedWithPokemons: { name: string, url: string }[]}): GetPokemonsGatewayPort => ({
  getPokemons: async () => {
    const pokemons: { name: string, url: string }[] = feedWithPokemons ?? []
 
    return {
      results: pokemons
    }
  }
})