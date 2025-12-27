import type { Pokemons } from "../../entities/pokemon";
import type { GetPokemonsGatewayPort } from "../../ports/get-pokemons.gateway.port";

export const getPokemonsHandler = (
  gateway: GetPokemonsGatewayPort
): Promise<Pokemons> => gateway.getPokemons();
