import type { ProtoPokemon } from "../../adapters/primary/ui/pages/CreatePokemon/CreatePokemon";
import type { Pokemon } from "../entities/pokemon";

export type CreatePokemonGatewayPort = {
  createPokemon: (pokemon: ProtoPokemon) => Promise<Pokemon>;
};
