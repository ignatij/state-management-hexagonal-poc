import type { AllPokemonsCacheManager } from "../cache/all-pokemons.cache";
import type { OnePokemonCacheManager } from "../cache/one-pokemon.cache";
import type {
  AllPokemons,
  AllPokemonsItem,
} from "../ui/components/AllPokemons/AllPokemons";
import type { ProtoPokemon } from "../ui/components/AllPokemons/CreatePokemon/CreatePokemon";
import type { OnePokemon } from "../ui/components/OnePokemon/OnePokemon";

export type Bff = {
  getAllPokemons: () => Promise<AllPokemons>;
  getOnePokemon: (pokemonId: number) => Promise<OnePokemon>;
  createPokemon: (pokemon: ProtoPokemon) => Promise<AllPokemonsItem>;
};

type Cache = {
  allPokemons: AllPokemonsCacheManager;
  onePokemon: OnePokemonCacheManager;
};

export type QuarzoDependencies = {
  bff: Bff;
  cache: Cache;
};
