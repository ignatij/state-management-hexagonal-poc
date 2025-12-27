import type { Pokemon } from "../../entities/pokemon";
import type {
  CreatePokemonGatewayPort,
  CreatePokemonRequest,
} from "../../ports/create-pokemon.gateway.port";

export const createPokemonHandler = (
  gateway: CreatePokemonGatewayPort,
  request: CreatePokemonRequest
): Promise<Pokemon> => gateway.createPokemon(request);
