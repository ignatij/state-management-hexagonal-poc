import type { GetPokemonsGatewayPort } from "../../../core/ports/get-pokemons.gateway.port";

export const getPokemonsGateway = (): GetPokemonsGatewayPort => ({
  getPokemons: async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const result = await response.json();
    return result.results;
  },
});
