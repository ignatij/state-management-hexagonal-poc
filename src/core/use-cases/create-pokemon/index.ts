import type { ProtoPokemon } from "../../../adapters/primary/ui/pages/CreatePokemon/CreatePokemon";
import type { Pokemon } from "../../entities/pokemon";
import type { CreatePokemonGatewayPort } from "../../ports/create-pokemon.gateway.port";

export const createPokemonHandler = (
  gateway: CreatePokemonGatewayPort,
  request: ProtoPokemon
): Promise<Pokemon> => gateway.createPokemon(request);
