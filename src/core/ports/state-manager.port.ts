import type { Pokemon, Pokemons } from "../entities/pokemon";

export type PokemonsState = {
  data: Pokemons | undefined;
  isLoading: boolean;
  error: Error | null;
};

export type StateManagerPort = {
  getPokemons: () => PokemonsState;
  addPokemon: (pokemon: Pokemon) => Promise<void>;
  removePokemon: (pokemonName: string) => Promise<void>;
  updatePokemon: (pokemon: Pokemon) => Promise<void>;
};
