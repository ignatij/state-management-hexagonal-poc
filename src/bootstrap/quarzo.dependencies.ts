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

export type QuarzoDependencies = {
  bff: Bff;
};
