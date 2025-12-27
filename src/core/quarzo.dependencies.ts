import type { Pokemon, Pokemons } from "../entities/pokemon";
import type { ProtoPokemon } from "../ui/CreatePokemon/CreatePokemon";
import type { StateManagerPort } from "./ports/state-manager.port";

export type Bff = {
  getPokemons: () => Promise<Pokemons>;
  createPokemon: (pokemon: ProtoPokemon) => Promise<Pokemon>;
};

export type QuarzoDependencies = {
  bff: Bff;
  stateManager: StateManagerPort;
};
