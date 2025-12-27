import type { ProtoPokemon } from "../../ui/CreatePokemon/CreatePokemon";
import type { Pokemon } from "../../entities/pokemon";

export type CreatePokemonGatewayPort = {
  createPokemon: (pokemon: ProtoPokemon) => Promise<Pokemon>;
};
