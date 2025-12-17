import type { GetPokemonsGatewayPort } from "../../../core/ports/get-pokemons.gateway.port"

export const getPokemonsGateway = (): GetPokemonsGatewayPort => ( {
  getPokemons: async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    return response.json()
  }
})
