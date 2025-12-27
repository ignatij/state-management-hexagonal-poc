import type { Pokemons } from "../entities/pokemon";

export type GetPokemonsGatewayPort = {
  getPokemons: () => Promise<Pokemons>;
};
