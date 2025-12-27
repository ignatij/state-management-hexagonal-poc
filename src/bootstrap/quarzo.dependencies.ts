import type { Pokemon, Pokemons } from "../entities/pokemon";
import type { ProtoPokemon } from "../ui/CreatePokemon/CreatePokemon";

export type Bff = {
  getPokemons: () => Promise<Pokemons>;
  createPokemon: (pokemon: ProtoPokemon) => Promise<Pokemon>;
};

export type PokemonsState = {
  data: Pokemons | undefined;
  isLoading: boolean;
  error: Error | null;
};

export type CacheManager = {
  getPokemons: () => PokemonsState;
  addPokemon: (pokemon: Pokemon) => Promise<void>;
  removePokemon: (pokemonName: string) => Promise<void>;
  updatePokemon: (pokemon: Pokemon) => Promise<void>;
};

export type QuarzoDependencies = {
  bff: Bff;
  cache: CacheManager;
};
